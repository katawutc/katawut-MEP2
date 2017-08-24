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

/** */

/** test header */
app.get('/testHeader/:testID', function(req, res) {
  db.collection('unSubscribeTestHeader').findOne({testID: req.params.testID}, cb);
                                        /*function(err, docs) {*/
  function cb(err, doc) {
    if (err) console.log(err)
    else {
      res.json(doc);
    }
  }
})
/** */

/** unSubscribeUser register*/
app.post('/unSubscribeUser/register', function(req, res) {
  db.collection('unSubscribeUser').insert({userName: 'unSubscribe',
                                            testID: req.body.testID,
                                            testMode: req.body.testMode,
                                            accessTime: req.body.accessTime}, cb);
  function cb(err, doc) {
    if (err) throw err;
    else {
      var userID = doc.insertedIds[0];
      db.collection('unSubscribeUser').update({_id:userID}, {$set:{userID: userID}});
      res.json({userName: 'unSubscribe',
                userID: userID});
              }
            }
})
/** */

/** To get exam question both tutorial and exam mode */
app.get('/unSubscribeTest/:mode/:testID/:questionNumber', function(req, res) {

  db.collection('unSubscribeTestContent').findOne({testID: req.params.testID,
                                                   questionNumber: req.params.questionNumber}, cb);

    function cb(err, doc) {
      if (err) res.json(err);
      else {
        res.json(doc);
      }
    }
})
/** */

/** check answer unSubscribe content */
app.post('/unSubscribeTest/checkAnswer/:testMode', function(req, res) {
  // Use post data to retrieve Solution from the DB to check the answer and response back

var userName = req.body.userName;
var solutionID = req.body.testID;
var testStartAt = req.body.testStartAt;
var questionNumber = req.body.questionNumber;
var userAnswer = req.body.answer;

var solution;
var explanation;

if (req.body.testMode === 'tutorial') {
  // Retrieve Solution from the DB
  db.collection('unSubscribeSolutionContent').findOne({solutionID: solutionID,
                                            solQuestionNumber: questionNumber},
                                            cb); /*function (err, doc) {*/
    function cb(err, doc) {
      if (err) throw err;

      solution = doc.solution;
      explanation = doc.explanation;

      /** Record user Test result in the DB somewhere here
        * 1. score and count score
        * 2. cumulative score
        * 3. time spent on the question
        * 4. use collection 'userTestResult'
        */

        if (userAnswer === solution) {

          db.collection('unSubscribeUserTestResult')
            .insert({userName: req.body.userName,
                    userID: req.body.userID,
                    testID: req.body.testID,
                    testMode: req.body.testMode,
                    testStartAt: req.body.testStartAt,
                    questionStartAt: req.body.currentQuestionStartAt,
                    questionFinishAt: req.body.currentQuestionFinishAt,
                    questionNumber: req.body.questionNumber,
                    userAnswer:req.body.answer,
                    result: 'correct'});

                    res.json({result: 'Correct',
                    explanation: doc.explanation});
                  }
                  else {

                    db.collection('unSubscribeUserTestResult')
                    .insert({userName: req.body.userName,
                      userID: req.body.userID,
                      testID: req.body.testID,
                      testMode: req.body.testMode,
                      testStartAt: req.body.testStartAt,
                      questionStartAt: req.body.currentQuestionStartAt,
                      questionFinishAt: req.body.currentQuestionFinishAt,
                      questionNumber: req.body.questionNumber,
                      userAnswer:req.body.answer,
                      result: 'wrong'});

                      res.json({result: 'Wrong',
                      explanation: doc.explanation});
                    }
                } // function cb
              }

  if (req.body.testMode === 'exam') {
    // Retrieve Solution from the DB
    db.collection('unSubscribeSolutionContent').findOne({solutionID: solutionID,
                                              solQuestionNumber: questionNumber},
                                              cb); /*function (err, doc) { */

      function cb(err, doc) {
        if (err) throw err;

        solution = doc.solution;
        explanation = doc.explanation;

      /** Record user Test result in the DB somewhere here
        * 1. score and count score
        * 2. cumulative score
        * 3. time spent on the question
        * 4. use collection 'userTestResult'
        */

      if (userAnswer === solution) {

          db.collection('unSubscribeUserTestResult')
            .insert({userName: req.body.userName,
                     userID: req.body.userID,
                     testID: req.body.testID,
                     testMode: req.body.testMode,
                     testStartAt: req.body.testStartAt,
                     questionStartAt: req.body.currentQuestionStartAt,
                     questionFinishAt: req.body.currentQuestionFinishAt,
                     questionNumber: req.body.questionNumber,
                     userAnswer:req.body.answer,
                     result: 'correct'})

          res.json('answer checked');
        }
        else {

          db.collection('unSubscribeUserTestResult')
            .insert({userName: req.body.userName,
                     userID: req.body.userID,
                     testID: req.body.testID,
                     testMode: req.body.testMode,
                     testStartAt: req.body.testStartAt,
                     questionStartAt: req.body.currentQuestionStartAt,
                     questionFinishAt: req.body.currentQuestionFinishAt,
                     questionNumber: req.body.questionNumber,
                     userAnswer:req.body.answer,
                     result: 'wrong'});

          res.json('answer checked');
        }
      }
    }
  })
/** */

/** get test scrore UnSubscribeUser*/
app.get('/getTestScoreUnSubscribeUser/:userID/:testID/:testMode/:testStartAt',
  function(req, res) {
    db.collection('unSubscribeUserTestResult').find({
                                  userID: req.params.userID,
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
/** */

/** get test summary UnSubscribeUser*/
app.get('/getTestSummaryUnSubscribeUser/:userID/:testID/:testMode/:testStartAt', function (req, res) {

  db.collection('unSubscribeUserTestResult').find({userID: req.params.userID,
                                                   testID: req.params.testID,
                                                   testMode: req.params.testMode,
                                                   testStartAt: req.params.testStartAt}).toArray(cb);

    function cb(err, doc) {
      if (err) throw err;
      else {
        res.json(doc);
      }
    }
})
/** */

/** review solutuon UnSubscribeUser*/
app.get('/reviewUnSubscribeTest/:testID/:questionNumber', function(req, res) {
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

/** create answer sheet */
app.post('/createAnswerSheetExam', function(req, res) {
  console.log('arrive createAnswerSheetExam');

  console.log(req.body.numberOfQuestion);

  // loop in js to insert answer sheet
  /**
   * still need to fix defect on asynchronous call \
   * return only when all inserted
   * async js; promise
   */

  for(var i = 1; i <= req.body.numberOfQuestion; i++) {

    var questionNumber = i.toString();

    db.collection('examAnswerSummary').insert({userName: req.body.userName,
                                                userID: req.body.userID,
                                                testID: req.body.testID,
                                                testMode: req.body.testMode,
                                                testStartAt: req.body.testStartAt,
                                                questionNumber: questionNumber}, cb);
    function cb(err, doc) {
      if (err) throw err;
      else {
        console.log('empty answer sheet is created for '+questionNumber);
      }
    }
  }
  res.json('return createAnswerSheetExam');
})


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

/** get user setting*/
app.get('/setting/su/:userID', function(req, res) {

  db.collection('userSetting').findOne({userID: req.params.userID,
                                        userRole: 'su'}, cb);

  function cb(err, doc) {
    if (err) throw err;
    console.log(doc);
    res.json(doc);
  }
})
/** */
