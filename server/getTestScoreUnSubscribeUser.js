
module.exports = function getTestScoreUnSubscribeUser(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  function testScore_cb(err, score) {
    if (err) throw error;
    else {
      res.json(score);
    }
  }

   db.collection('unSubscribeUserTestResult')
   .find({'userID': req.params.userID,
          'testID': req.params.testID,
          'testMode': req.params.testMode,
          'testStartAt': req.params.testStartAt,
          'result': 'correct'}).count(testScore_cb);
 }
