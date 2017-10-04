module.exports = function getSuTestScore(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  //suTestHistory
  db.collection('suTestAnswerSheet').find({ userID: req.params.userID,
                                        suTestID: req.params.suTestID,
                                        suTestMode: req.params.suTestMode,
                                        suTestStartAt: req.params.suTestStartAt,
                                        suTestResult: 'correct'}).count(cb);

  function cb(err, score) {
    if (err) throw error;
    else {
      console.log(score);
      res.json(score.toString());
    }
  }
}
