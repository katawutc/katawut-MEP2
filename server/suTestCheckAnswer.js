module.exports = function suTestCheckAnswer(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('suSolutionContent').findOne({solutionID: req.body.testID,
                                              solQuestionNumber: req.body.questionNumber},
    function(err, doc) {
      if (err) throw err;
      if (doc) {
        if (req.body.answer === doc.solution) {
          res.json({result: 'correct',
                    explanation: doc.explanation});
        }
        else if (req.body.answer !== doc.solution) {
          res.json({result: 'wrong',
                    explanation: doc.explanation});
        }
      }
      else {
          res.json({errorMessage: 'error'});
      }
    })
}
