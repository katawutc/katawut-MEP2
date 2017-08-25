// MEP2
// Katawut Chuasiripattana

var express = require('express');
//var port = 5000; // set listening port
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
app.get('/setting/su/:userID', require('./server/setting'));

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
/** */

/** create answer sheet */
app.post('/createAnswerSheetExam', require('./server/createAnswerSheetExam'));

/** to record exam answer to review and modify later*/
app.post('/examAnswerSummary', function(req, res) {
  console.log('arrive at examAnswerSummary');

  db.collection('examAnswerSummary').update({userName: req.body.userName,
                                              userID: req.body.userID,
                                              testID: req.body.testID,
                                              testMode: req.body.testMode,
                                              testStartAt: req.body.testStartAt,
                                              questionNumber: req.body.questionNumber},
                                              { $set:
                                                { status: req.body.status,
                                                  userAnswer:req.body.answer,
                                                  questionStartAt: req.body.currentQuestionStartAt,
                                                  questionFinishAt: req.body.currentQuestionFinishAt}
                                              }, cb);
    function cb (err, doc) {
      if (err) throw err;
      else {
        //console.log(doc);

        // checking answer and update the score here

        var solutionID = req.body.testID;
        var questionNumber = req.body.questionNumber;
        var solution;
        var userAnswer = req.body.answer;

        // Retrieve Solution from the DB
        db.collection('unSubscribeSolutionContent').findOne({solutionID: solutionID,
                                                  solQuestionNumber: questionNumber},
                                                  cb); /*function (err, doc) { */
        function cb(err, solDoc) {
          console.log(solDoc);
          if (err) throw err;
          else {
            solution = solDoc.solution;

            console.log(userAnswer);
            if (solution === userAnswer) {
              db.collection('examAnswerSummary').update({userName: req.body.userName,
                                                          userID: req.body.userID,
                                                          testID: req.body.testID,
                                                          testMode: req.body.testMode,
                                                          testStartAt: req.body.testStartAt,
                                                          questionNumber: req.body.questionNumber},
                                                          { $set: {result: 'correct'}});
            }
            else {
              db.collection('examAnswerSummary').update({userName: req.body.userName,
                                                          userID: req.body.userID,
                                                          testID: req.body.testID,
                                                          testMode: req.body.testMode,
                                                          testStartAt: req.body.testStartAt,
                                                          questionNumber: req.body.questionNumber},
                                                          { $set: {result: 'wrong'}});
            }
          }
        }
        res.json('answer recorded');
      }
    }
})
/** */

/** get answer sheet summary to display and modify */
app.get('/getAnswerSummary/:userID/:testID/:testMode/:testStartAt',
          function (req, res) {
  console.log('arrive at get answer summary');
  db.collection('examAnswerSummary').find({userID: req.params.userID,
                                            testID: req.params.testID,
                                            testMode: req.params.testMode,
                                            testStartAt: req.params.testStartAt})
                                            .sort({"questionNumber":1}).toArray(cb);
  function cb(err, doc) {
    if (err) throw err;
    else {
      console.log(doc);
      res.json(doc);
    }
  }
})
/** */

/** get answer from the answer sheet to revise/review */
app.get('/reviseExamAnswerSheet/:userID/:testMode/:testStartAt/:testID/:questionNumber',
          function(req, res) {
  console.log('arrive reviseExamAnswerSheet');

  db.collection('examAnswerSummary').findOne({userID: req.params.userID,
                                              testMode: req.params.testMode,
                                              testStartAt: req.params.testStartAt,
                                              testID: req.params.testID,
                                              questionNumber: req.params.questionNumber}, cb);
  function cb(err, doc) {
    if (err) throw err;
    else {
      res.json(doc.userAnswer);
    }
  }
})
/** */

/** get exam score */
app.get('/getExamScore/:userID/:testID/:testMode/:testStartAt', function(req, res) {
  console.log('arrive at get exam score');

  db.collection('examAnswerSummary').find({ userID: req.params.userID,
                                            testID: req.params.testID,
                                            testMode: req.params.testMode,
                                            testStartAt: req.params.testStartAt,
                                            result: 'correct'
                                            }).count(cb);
  function cb(err, score) {
    if (err) throw error;
    else {
      res.json(score);
    }
  }
})

/** get exam summary */
app.get('/getExamSummary/:userID/:testID/:testMode/:testStartAt', function(req, res) {
  console.log('arrive at get exam summary');

  db.collection('examAnswerSummary').find({ userID: req.params.userID,
                                            testID: req.params.testID,
                                            testMode: req.params.testMode,
                                            testStartAt: req.params.testStartAt})
                                            .sort({"questionNumber":1}).toArray(cb);
  function cb(err, doc) {
    if (err) throw err;
    else {
      // still need to refactor on what specifically to return
      res.json(doc);
    }
  }
})

/** get test solution */
app.get('/reviewTestSolution/:testID/:questionNumber', function(req, res) {

  db.collection('unSubscribeSolutionContent').findOne({solutionID: req.params.testID,
                                            solQuestionNumber: req.params.questionNumber},
                                            cb);
    function cb(err, doc) {
      if (err) throw err;
      else {
        res.json(doc);
      }
    }
})
/** */
