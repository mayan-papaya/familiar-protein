var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  highestScore: {
    title: String,
    score: Number,
    answer: String,
  },
  friends: [String],
  questions: [{
    title: String,
    score: Number,
    time: Number,
    answer: String,
  }]

});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  console.log('GOT TO COMPAREPASSWORDS');
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

UserSchema.pre('save', function (next) {
  console.log('ITS GETTING HERE');
  var user = this;
  console.log('USER IS HERE', user);

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    console.log('IF STATEMENT IN ISMODIFIED');
    return next();
  }
  console.log('USER IS HERE IN LINE 45', user);
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      console.log('IF STATEMENT IN GENSALT');
      return next(err);
    }
    console.log('USER IS HERE IN LINE 52 YO', user);
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        console.log('IF STATEMENT IN BCRYPT HASH');
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      console.log('USER HERE IN USERMODEL:', user);
      next();
    });
  });
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
