module.exports = function suTestCheckAnswer(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('suSolutionContent').findOne({solutionID: req.body.testID,
                                              solQuestionNumber: req.body.questionNumber},
    function(err, doc) {
      if (err) throw err;
      if (doc) {
        if (req.body.answer === doc.solution) {

          //suTestHistory
          db.collection('suTestAnswerSheet').insert({userID: req.body.userID,
                                                 suTestID: req.body.suTestID,
                                                 suTestMode: req.body.suTestMode,
                                                 suTestStartAt: req.body.suTestStartAt,
                                                 suTestQuestionNumber: req.body.suTestQuestionNumber,
                                                 suTestAnswer: req.body.answer,
                                                 suTestResult: 'correct'}, function(err, docHistory) {

             res.json({result: 'correct',
                       explanation: doc.explanation});
          })
        }
        else if (req.body.answer !== doc.solution) {

          //suTestHistory
          db.collection('suTestAnswerSheet').insert({userID: req.body.userID,
                                                 suTestID: req.body.suTestID,
                                                 suTestMode: req.body.suTestMode,
                                                 suTestStartAt: req.body.suTestStartAt,
                                                 suTestQuestionNumber: req.body.suTestQuestionNumber,
                                                 suTestAnswer: req.body.answer,
                                                 suTestResult: 'wrong'}, function(err, docHistory) {

             res.json({result: 'wrong',
                       explanation: doc.explanation});
          })
        }
      }
      else {
          res.json({errorMessage: 'error'});
      }
    })
}
