var userController = require('./userController');

module.exports = function (app) {
  app.post('/signup', userController.signup);
  app.post('/signin', userController.signin);
  app.post('/profile', userController.getUser);
  app.post('/endGame', userController.updateUser);
  app.get('/users', userController.getAll);
};
