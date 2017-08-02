// MEP2
// Katawut Chuasiripattana

var express = require('express');
var port = 5000; // set listening port
var app = express();

var bcrypt = require('bcrypt');
const saltRounds = 10;

// use plain html and angular js
// set static folder to render the page
app.use(express.static('app'));

// Body Parser Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// MongoDB
var mongoClient = require('mongodb');
var objectID = require('mongodb').ObjectID;
// user: katawutc
var mlabDB = 'mongodb://katawut:AccessMongo@ds129023.mlab.com:29023/mep';
var db;
mongoClient.connect(mlabDB, function(err, database){
  if (err) console.log('Error, cannot connect to MongoDB');
  else {
    console.log('MongoDB MLab connected ...');
  }
  db = database;
});

app.listen(port, function(){
	console.log('Server starts on port '+ port);
});

/** sign up */
app.post('/signUp', function(req, res) {

  plainPassword = req.body.password;

  // use bcrypt to hash and store password
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(plainPassword, salt);

  // connect to the DB
  db.collection('user').insert({userName: req.body.name,
                               userEmail: req.body.email,
                               userHashedPassword: hash}, cb);
  function cb(err, result) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
      // duplicate userEMail
      res.json({ success: false,
                 message: 'user Email already exist!' });
    }
      else {
        return res.status(500).send(err);
    }
  }
    else {

      var userID = result.insertedIds[0];

      db.collection('user').update({_id:userID}, {$set:{userID: userID}});

      res.json({success: true,
                message:'sign up success'});
              }
  }
});
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
                     questionNo: req.body.questionNumber,
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
                     questionNo: req.body.questionNumber,
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
