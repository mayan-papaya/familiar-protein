var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

var secret = 'shhhhh';

module.exports = {


  getUser: function(req, res){
    console.log('asdfasdfsadf', req.body);
    var username = req.body.username;
    var findUser = Q.nbind(User.findOne, User);
    if(!username) {
      res.sendStatus(401);
    }
    findUser({username: username})
      .then(function(user) {
        console.log(user);
        res.json(JSON.stringify(user));
      });
  },


  updateUser: function(req, res){
    var username = req.body.username;
    var question = req.body.question;
    var highestScore;
    console.log(';asdf', question);
    var query = {username: username};
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function(user){
        for(var i = 0; i < user.questions.length; i++){
          if(user.questions[i].title === question.title) {
            var answered = true;
            var index = i;
          }
        }
        if(answered){
          if(question.score > user.questions[index].score){
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
        }else{
          User.findOneAndUpdate(query, {$push: {questions: question}}, {safe: true, upsert: true}, function(err, model){
            console.log(err);
          });
          User.findOneAndUpdate(query, {highestScore: highestScore}, {safe: true, upsert: true}, function(err, model){
            console.log(err);
          });
        }

        highestScore = user.highestScore;
        if(highestScore.score < question.score){
          highestScore = question;
        }
      });
  },


  // gets all questions from the database
  getAll: function(req, res) {
    var findUsers = Q.nbind(User.find, User);

    findUsers().then(function(users) {
      res.json(users.map(function(user) {
        return {username: user.username};
      }));
    });
  },



  signin: function (req, res) {
    var username = req.body.username,
        password = req.body.password;
    console.log('REQ.BODY HERE', req.body);

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        console.log('USER IS HERE', user);
        if (!user) {
          res.statusCode = 403;
          res.json({error: 'Incorrect username or password'});
        } else {
          user.comparePasswords(password)
            .then(function(foundUser) {
              console.log('FOUND USER!', foundUser);
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
        console.log('User object here: ', user);
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
          console.log('New user object here: ', newUser);
          return create(newUser);
        }
      })
      .then(function (user) {
        console.log('Got to the then statement in userController:', user);
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
