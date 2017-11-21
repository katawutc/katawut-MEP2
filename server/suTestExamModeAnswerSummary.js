module.exports = function suTestExamModeAnswerSummary(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  //suTestHistory
  db.collection('suTestAnswerSheet')
  .find({'userID': req.params.userID,
         'suTestID': req.params.suTestID,
         'suTestMode': 'exam',
         'suTestStartAt': req.params.suTestStartAt})
         .sort({"suTestQuestionNumber":1}).toArray(cb);

    function cb(err, doc) {
      if (err) throw err;
      else {

        res.json(doc);
      }
    }
}
