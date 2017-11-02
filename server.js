// MEP2
// Katawut Chuasiripattana
var http = require('http');
var express = require('express');
var compression = require('compression');
var app = express();

app.use(compression());

var server = http.createServer(app);
var socketIO = require('socket.io').listen(server);

var port;
app.set('port', (process.env.PORT || 5000));

var objectID = require('mongodb').ObjectID;

/** jwt */
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

/**  JWT Strategy */
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret'; /* to create a new secretOrKey */

var strategy = new JwtStrategy(opts, function(jwt_payload, next) {

  /** to have another random number for more security ? */
   var query = {userID: jwt_payload.userID,
                userRole: jwt_payload.userRole};

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

   db.collection('user').findOne(query, function(err, result) {
     if (result) {
       next(null, result);
     } else {
       next(null, false);
     }
   });
});

passport.use(strategy);

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
app.use(express.static('public/image'));
app.use(express.static('dist'));
app.use(express.static('dist/js'));
app.use(express.static('bower_components/ng-scroll-glue/dist'));
/** */

// Body Parser Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** MongoDB */
var mongo = require('./server/mongoDBConnect');
mongo.connectMongoDB( function() {
  server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))});
});

/** handle socket io connection */
socketIO.on('connection', require('./server/socketIO'));

/** fb log in callback */
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

/** fb /auth/facebook/callback */
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
// to refactor to a specific role e.g. su, pu, tw
app.get('/accountData/su/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/suAccountData'));

/** get user list to diaplay on admin dashboard */
app.get('/dashboard/ad/:userID/userList', passport.authenticate('jwt', {session: false}),
  require('./server/userList'));

/** logIn */
app.post('/logIn', require('./server/logIn'));

/** get user setting*/
app.get('/profileSetting/su/:userID', require('./server/profileSetting'));

/** get user preference setting*/
app.get('/preferenceSetting/su/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/preferenceSetting'));

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
app.post('/saveSetting/:userRole/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/saveSetting'));

/** first timr setting */
app.post('/firstSetting/:userRole/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/firstSetting'));

/** get user account for admin page view */
app.get('/admin/account/:userRole/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/checkAdminAuthority'),
  require('./server/getAccountAdmin'));

/** get user account for admin page view */
app.get('/admin/setting/:userRole/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/checkAdminAuthority'),
  require('./server/getSettingAdmin'));

/** get user account for admin page view */
app.get('/admin/lastLogin/:userRole/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/checkAdminAuthority'),
  require('./server/getLastLoginAdmin'));

/** get user login history for admin page view */
app.get('/admin/loginHistory/:userRole/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/checkAdminAuthority'),
  require('./server/getLoginHistoryAdmin'));

/** get su new test info */
app.get('/getSuNewTestInfo/:userID/:testID/:testRunningNumber', passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuNewTestInfo'));

/** get su new test header */
app.get('/getSuNewTestHeader/:userID/:testID/:testRunningNumber', passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuNewTestHeader'));

/** get su test question */
app.get('/getSuTestQuestion/:userID/:suTestID/:suTestQuestionNumber', passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuTestQuestion'));

/** post su test to check answer tutorial mode */
app.post('/suTest/checkAnswer/:userID', passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/suTestCheckAnswer'));

/** get su test summary */
app.get('/getSuTestSummary/:userID/:suTestID/:suTestMode/:suTestStartAt',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuTestSummary'));

/** get su test score */
app.get('/getSuTestScore/:userID/:suTestID/:suTestMode/:suTestStartAt',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuTestScore'));

/** get su test review */
app.get('/getSuTestReview/:userID/:suTestID/:suTestQuestionNumber',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuTestReview'));

/** create su exam sheet */
app.post('/createSuExamSheet/:userID/:suTestID',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/createSuExamSheet'));

/** submit answer su test exam mode */
app.post('/submitAnswerSuTestExamMode/:userID/:suTestID/:suTestQuestionNumber',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/submitAnswerSuTestExamMode'));

/** get su test exam mode answer summary */
app.get('/suTestExamModeAnswerSummary/:userID/:suTestID/:suTestStartAt',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/suTestExamModeAnswerSummary'));

/** get su test exam answer for revising in the answer sheet */
app.get('/getSuTestExamAnswer/:userID/:suTestID/:suTestStartAt/:suTestQuestionNumber',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuTestExamAnswer'));

/** get su test exam question for revising in the answer sheet */
app.get('/getSuTestExamQuestion/:userID/:suTestID/:suTestStartAt/:suTestQuestionNumber',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuTestExamQuestion'));

/** register su test history */
app.post('/registerSuTestHistory/:userID/:suTestID/:suTestMode/:suTestStartAt',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/registerSuTestHistory'));

/** get su test history */
app.get('/getSuTestHistory/:userID',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuTestHistory'));

/** generate su new test ID */
app.get('/generateNewSuTestID/:userID',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/generateNewSuTestID'));

/** generate su new test */
app.get('/generateNewSuTest/:userID/:testID/:testRunningNumber',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/generateNewSuTest'));

/** get su note list */
app.get('/getSuNoteList/:userID/',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuNoteList'));

/** get su note to view */
app.get('/getSuNote/:userID/:title/:noteTime',
  passport.authenticate('jwt', {session: false}),
  require('./server/checkSuAuthority'),
  require('./server/getSuNote'));
