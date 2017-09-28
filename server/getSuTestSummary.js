module.exports = function getSuTestSummary(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('suTestHistory').find({userID: req.params.userID,
                                       suTestID: req.params.suTestID,
                                       suTestMode: req.params.suTestMode,
                                       suTestStartAt: req.params.suTestStartAt})
                                       .sort({"suTestQuestionNumber":1}).toArray(cb);

   function cb(err, doc) {
     if (err) throw err;
     if(doc) {
       // to refactot res.json only relevant field information
       res.json(doc);
     }
     else {
       res.json({errorMessage: 'error'});
     }
   }
}
