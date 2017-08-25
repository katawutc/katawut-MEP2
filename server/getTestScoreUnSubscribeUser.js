
module.exports = function getTestScoreUnSubscribeUser(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

   db.collection('unSubscribeUserTestResult').find({
                                 userID: req.params.userID,
                                 testID: req.params.testID,
                                 testMode: req.params.testMode,
                                 testStartAt: req.params.testStartAt,
                                 result: 'correct'
                               }).count(cb);
   function cb(err, score) {
     if (err) throw error;
     else {
       res.json(score);
     }
   }
 }
