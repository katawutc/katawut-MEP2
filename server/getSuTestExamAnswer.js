module.exports = function getSuTestExamAnswer(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('suTestHistory').findOne({userID: req.params.userID,
                                            suTestID: req.params.suTestID,
                                            suTestMode:'exam',
                                            suTestStartAt: req.params.suTestStartAt,
                                            suTestQuestionNumber: req.params.suTestQuestionNumber}, cb);

  function cb(err, doc) {
    if (err) throw err;
    if (doc) {
      res.json(doc.suTestAnswer);
    }
  }
}
