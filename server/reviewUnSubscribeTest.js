
module.exports = function reviewUnSubscribeTest(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('unSubscribeSolutionContent').findOne({solutionID: req.params.testID,
                                            solQuestionNumber: req.params.questionNumber},
                                            cb);
    function cb(err, doc) {
      if (err) throw err;
      else {
        res.json(doc);
      }
    }
}
