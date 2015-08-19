var mongoose = require('mongoose');

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

var User = mongoose.model('User', UserSchema);

module.exports = User;
