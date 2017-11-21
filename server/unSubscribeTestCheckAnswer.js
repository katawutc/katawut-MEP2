

module.exports = function unSubscribeTestCheckAnswer(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var userName = req.body.userName;
  var solutionID = req.body.testID;
  var testStartAt = req.body.testStartAt;
  var questionNumber = req.body.questionNumber;
  var userAnswer = req.body.answer;

  var solution;
  var explanation;

  if (req.body.testMode === 'tutorial') {
   // Retrieve Solution from the DB
    db.collection('unSubscribeSolutionContent')
    .findOne({'solutionID': solutionID,
              'solQuestionNumber': questionNumber}, cb); /*function (err, doc) {*/

     function cb(err, doc) {
       if (err) throw err;

       if (doc) {

       solution = doc.solution;
       explanation = doc.explanation;

         if (userAnswer === solution) {

           db.collection('unSubscribeUserTestResult')
             .insert({'userName': req.body.userName,
                      'userID': req.body.userID,
                      'testID': req.body.testID,
                      'testMode': req.body.testMode,
                      'testStartAt': req.body.testStartAt,
                      'questionStartAt': req.body.currentQuestionStartAt,
                      'questionFinishAt': req.body.currentQuestionFinishAt,
                      'questionNumber': req.body.questionNumber,
                      'userAnswer':req.body.answer,
                      'result': 'correct'});

                     res.json({'result': 'Correct',
                               'explanation': doc.explanation});
                   }
                   else {

                     db.collection('unSubscribeUserTestResult')
                     .insert({'userName': req.body.userName,
                              'userID': req.body.userID,
                              'testID': req.body.testID,
                              'testMode': req.body.testMode,
                              'testStartAt': req.body.testStartAt,
                              'questionStartAt': req.body.currentQuestionStartAt,
                              'questionFinishAt': req.body.currentQuestionFinishAt,
                              'questionNumber': req.body.questionNumber,
                              'userAnswer':req.body.answer,
                              'result': 'wrong'});

                       res.json({'result': 'Wrong',
                                 'explanation': doc.explanation});
                     }
                   }
                   else {res.json('solution not found')};
                 } // function cb
               }

 /** */
}
