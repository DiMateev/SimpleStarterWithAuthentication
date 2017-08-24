const passport = require('passport');

const Authentication = require('./controllers/authentication');
const Survey = require('./controllers/survey');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.post('/user/signin', requireSignin, Authentication.signin);
  app.post('/user/signup', Authentication.signup);

  app.post('/survey/new', requireAuth, Survey.createNew);
  app.get('/survey/user', requireAuth, Survey.fetchUserSurveys);
  app.get('/survey', Survey.fetchAllSurveys);
  app.get('/survey/:id', Survey.fetchSingleSurvey);
  app.delete('/survey/:id', requireAuth, Survey.deleteSurvey);
  app.patch('/survey/vote/:id', Survey.voteForOption);
  app.patch('/survey/addoption/:id', requireAuth, Survey.addOption);
}