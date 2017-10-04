module.exports = function suTestExamModeAnswerSummary(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  //suTestHistory
  db.collection('suTestAnswerSheet').find({userID: req.params.userID,
                                            suTestID: req.params.suTestID,
                                            suTestMode: 'exam',
                                            suTestStartAt: req.params.suTestStartAt})
                                            .sort({"suTestQuestionNumber":1}).toArray(cb);

                                            // need to filter out only relevant fields

    function cb(err, doc) {
      if (err) throw err;
      else {
        console.log(doc);
        res.json(doc);
      }
    }
}
