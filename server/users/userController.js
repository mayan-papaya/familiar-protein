var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple'),
    _ = require('underscore');

var secret = 'shhhhh';

module.exports = {

  getUser: function(req, res){
    // console.log('asdfasdfsadf', req.body);
    var username = req.body.username;
    var findUser = Q.nbind(User.findOne, User);
    if(!username) {
      res.sendStatus(401);
    }
    findUser({username: username})
      .then(function(user) {
        // console.log(user);
        res.json(JSON.stringify(user));
      });
  },

  updateUser: function(req, res){
    var username = req.body.username;
    var question = req.body.question;
    var highestScore;
    // console.log(';asdf', question);
    var query = {username: username};
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function(user){
        var answered = false;
        var index = 0;

        for(var i = 0; i < user.questions.length; i++){
          if(user.questions[i].title === question.title) {
            answered = true;
            index = i;
          }
        }

        highestScore = user.highestScore;
        if(highestScore.score < question.score){
          highestScore = question;
        }

        if(answered) {
          if(question.score > user.questions[index].score) {
            User.findOneAndUpdate(query, {$pull: {questions: user.questions[index]}}, {safe: true, upsert: true}, function(err, model){
              console.log(err);
            });
            User.findOneAndUpdate(query, {$push: {questions: question}}, {safe: true, upsert: true}, function(err, model){
              console.log(err);
            });
            User.findOneAndUpdate(query, {highestScore: highestScore}, {safe: true, upsert: true}, function(err, model){
              console.log(err);
            });
          }
        } else {
          User.findOneAndUpdate(query, {$push: {questions: question}}, {safe: true, upsert: true}, function(err, model){
            console.log(err);
          });
          User.findOneAndUpdate(query, {highestScore: highestScore}, {safe: true, upsert: true}, function(err, model){
            console.log(err);
          });
        }

      });
  },

  addFollow: function(req, res) {
    var username = req.body.user;
    var toFollow = req.body.toFollow;
    var query = {username: username};
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function(user){
        // console.log('the user: ================>', user);
        if(!_.contains(user.following, toFollow)) {
          User.findOneAndUpdate(query, {$push: {following: toFollow}}, {safe: true, upsert: true}, function(err, model){
            console.log(err);
          });
          user.following.push(toFollow);
        }
        res.json(JSON.stringify({following: user.following}));
      });
  },


  // gets all questions from the database
  getAll: function(req, res) {
    var findUsers = Q.nbind(User.find, User);

    findUsers().then(function(users) {
      res.json(users.map(function(user) {
        console.log(user);
        return {username: user.username};
      }));
    });
  },

  signin: function (req, res) {
    var username = req.body.username,
        password = req.body.password;
    // console.log('REQ.BODY HERE', req.body);

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        // console.log('USER IS HERE', user);
        if (!user) {
          res.statusCode = 403;
          res.json({error: 'Incorrect username or password'});
        } else {
          user.comparePasswords(password)
            .then(function(foundUser) {
              // console.log('FOUND USER!', foundUser);
              if (foundUser) {
                var token = jwt.encode(user, secret);
                res.json({token: token});
              } else {
                res.statusCode = 403;
                res.json({error: 'Incorrect username or password'});
              }
            });
        }
      })
      .fail(function (error) {
        res.statusCode = 403;
        res.json({error: 'Incorrect username or password'});
      });
  },

  signup: function (req, res) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;
    var findOne = Q.nbind(User.findOne, User);
    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        // console.log('User object here: ', user);
        if (user) {
          res.statusCode = 403;
          res.json({error: 'Username taken'});
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          // console.log('New user object here: ', newUser);
          return create(newUser);
        }
      })
      .then(function (user) {
        // console.log('Got to the then statement in userController:', user);
        // create token to send back for auth
        var token = jwt.encode(user, secret);
        res.json({token: token});
      })
      .fail(function (error) {
        console.log('Signup error:', error);
        res.statusCode = 500;
        res.json({error: 'Server error'});
      });
  }
};
