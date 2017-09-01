// MEP2
// Katawut Chuasiripattana

var express = require('express');

var port;
var app = express();
app.set('port', (process.env.PORT || 5000));

var objectID = require('mongodb').ObjectID;

/** jwt */
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

/** helmet part */
var helmet = require('helmet');
app.use(helmet());
/** */


/**  use plain html and angular js
 *   set static folder to render the page
 */
app.use(express.static('app'));
app.use(express.static('public'));
app.use(express.static('public/html'));
/** */

// Body Parser Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** MongoDB */
var mongo = require('./server/mongoDBConnect');
mongo.connectMongoDB( function() {
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))});
});
/** */

/** fb log in callback */
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false ,failureRedirect: '/#!/errorPage'}),
  require('./server/fbAuthCallback'));

/** fb log in */
app.post('/fbLogIn', require('./server/fbLogIn'));

/** sign up */
app.post('/signUp', require('./server/signUp'));

/** account activation */
app.post('/activateAccount/:userID/:hashActivate', require('./server/activateAccount'));

/** login direct */
app.post('/logInDirect', require('./server/logInDirect'));

/** dashboard */
app.get('/dashboard/:userRole/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/dashboard'));

/** logIn */
app.post('/logIn', require('./server/logIn'));

/** get user setting*/
app.get('/profileSetting/su/:userID', require('./server/profileSetting'));

/** get user preference setting*/
app.get('/preferenceSetting/su/:userID', require('./server/preferenceSetting'));

/** test header */
app.get('/testHeader/:testID', require('./server/testHeader'));

/** unSubscribeUser register*/
app.post('/unSubscribeUser/register', require('./server/unSubscribeUserRegister'));

/** To get exam question both tutorial and exam mode */
app.get('/unSubscribeTest/:mode/:testID/:questionNumber', require('./server/unSubscribeTest'));

/** check answer unSubscribe content */
app.post('/unSubscribeTest/checkAnswer/:testMode', require('./server/unSubscribeTestCheckAnswer'));

/** get test scrore UnSubscribeUser*/
app.get('/getTestScoreUnSubscribeUser/:userID/:testID/:testMode/:testStartAt',
  require('./server/getTestScoreUnSubscribeUser'));

/** get test summary UnSubscribeUser*/
app.get('/getTestSummaryUnSubscribeUser/:userID/:testID/:testMode/:testStartAt',
  require('./server/getTestSummaryUnSubscribeUser'));

/** review solution UnSubscribeUser*/
app.get('/reviewUnSubscribeTest/:testID/:questionNumber',
  require('./server/reviewUnSubscribeTest'));

/** create answer sheet */
app.post('/createAnswerSheetExam', require('./server/createAnswerSheetExam'));

/** to record exam answer to review and modify later*/
app.post('/examAnswerSummary', require('./server/examAnswerSummary'));

/** get answer sheet summary to display and modify */
/** this is for exam mode; to refactor the callback name */
app.get('/getAnswerSummary/:userID/:testID/:testMode/:testStartAt',
          require('./server/getAnswerSummary'));

/** get exam score */
app.get('/getExamScore/:userID/:testID/:testMode/:testStartAt',
  require('./server/getExamScore'));

/** get exam summary */
app.get('/getExamSummary/:userID/:testID/:testMode/:testStartAt',
  require('./server/getExamSummary'));

/** get answer from the answer sheet to revise/review */
app.get('/reviseExamAnswerSheet/:userID/:testMode/:testStartAt/:testID/:questionNumber',
  require('./server/reviseExamAnswerSheet'));

/** get test solution */
/** this is probable duplicate withthe tutorial mode; to resue */
app.get('/reviewTestSolution/:testID/:questionNumber',
  require('./server/reviewTestSolution'));

/** save setting parameters */
app.post('/saveSetting/:userRole/:userID', require('./server/saveSetting'));
