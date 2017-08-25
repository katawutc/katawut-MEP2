
module.exports = function getExamSummary(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

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
}
