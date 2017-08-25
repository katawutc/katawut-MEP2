
var objectID = require('mongodb').ObjectID

module.exports = function getAnswerSummary(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('examAnswerSummary').find({userID: req.params.userID,
                                          testID: req.params.testID,
                                          testMode: req.params.testMode,
                                          testStartAt: req.params.testStartAt})
                                          .sort({"questionNumber":1}).toArray(cb);
function cb(err, doc) {
  if (err) throw err;
  else {
    console.log(doc);
    res.json(doc);
    }
  }
}
