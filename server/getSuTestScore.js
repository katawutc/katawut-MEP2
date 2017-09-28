module.exports = function getSuTestScore(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('suTestHistory').find({ userID: req.params.userID,
                                        suTestID: req.params.suTestID,
                                        suTestMode: req.params.suTestMode,
                                        suTestStartAt: req.params.suTestStartAt,
                                        suTestResult: 'correct'}).count(cb);

  function cb(err, score) {
    if (err) throw error;
    else {
      res.json(score);
    }
  }
}
