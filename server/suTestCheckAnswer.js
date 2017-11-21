module.exports = function suTestCheckAnswer(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  function foundSuSolution_cb(err, doc) {

    if (err) throw err;
    if (doc) {
      if (req.body.answer === doc.solution) {

        //suTestHistory
        db.collection('suTestAnswerSheet')
        .update({'userID': req.body.userID,
                 'testID': req.body.testID,
                 'suTestNumber': req.body.suTestNumber,
                 'suTestID': req.body.suTestID,
                 'suTestMode': req.body.suTestMode,
                 'suTestStartAt': req.body.suTestStartAt,
                 'suTestQuestionNumber': req.body.suTestQuestionNumber},
                 { $set:
                    {
                      'suTestAnswer': req.body.answer,
                      'suTestResult': 'correct'
                    }
                 }, cb);

        function cb(err, count, status) {
          if (err) throw err;

            res.json({'result': 'correct',
                      'explanation': doc.explanation});
        }
      }
      else if (req.body.answer !== doc.solution) {

        //suTestHistory
        db.collection('suTestAnswerSheet')
        .update({'userID': req.body.userID,
                 'testID': req.body.testID,
                 'suTestNumber': req.body.suTestNumber,
                 'suTestID': req.body.suTestID,
                 'suTestMode': req.body.suTestMode,
                 'suTestStartAt': req.body.suTestStartAt,
                 'suTestQuestionNumber': req.body.suTestQuestionNumber},
                    {$set:
                      {
                        'suTestAnswer': req.body.answer,
                        'suTestResult': 'wrong'
                      }
                    }, cb);

        function cb(err, count, status) {
          if (err) throw err;

            res.json({'result': 'wrong',
                      'explanation': doc.explanation});
        }
      }
    else {
        res.json({'errorMessage': 'error'});
    }
  }
}

  // main entry point of the module */
  db.collection('suSolutionContent')
  .findOne({'solutionID': req.body.testID,
            'solQuestionNumber': req.body.questionNumber}, foundSuSolution_cb);
}
