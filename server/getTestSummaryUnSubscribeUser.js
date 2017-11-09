
module.exports = function getTestSummaryUnSubscribeUser(req, res) {

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

    function testSummary_cb(err, doc) {
      if (err) throw err;
      else {
        res.json(doc);
      }
    }

    db.collection('unSubscribeUserTestResult')
    .find({'userID': req.params.userID,
           'testID': req.params.testID,
           'testMode': req.params.testMode,
           'testStartAt': req.params.testStartAt}).toArray(testSummary_cb);

  }
