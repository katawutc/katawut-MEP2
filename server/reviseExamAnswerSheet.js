
module.exports = function reviseExamAnswerSheet(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('examAnswerSummary')
  .findOne({'userID': req.params.userID,
            'testMode': req.params.testMode,
            'testStartAt': req.params.testStartAt,
            'testID': req.params.testID,
            'questionNumber': req.params.questionNumber}, cb);
            
  function cb(err, doc) {
    if (err) throw err;
    else {
      res.json(doc.userAnswer);
    }
  }
}
