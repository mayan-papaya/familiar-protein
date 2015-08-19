var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

var secret = 'shhhhh';

module.exports = {


  getUser: function(req, res){
    console.log(req.body);
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



  signin: function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        console.log(user);
        if (!user) {
          res.statusCode = 403;
          res.json({error: 'Incorrect username or password'});
        } else {
          user.comparePasswords(password)
            .then(function(foundUser) {
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
        console.log('++++++++++', req.body); // req.body is empty
    var findOne = Q.nbind(User.findOne, User);
    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        console.log('^^^^^^^^^^^', user);
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
          console.log('``````````', newUser);
          return create(newUser);
        }
      })
      .then(function (user) {
        console.log('got here: then', user);
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
