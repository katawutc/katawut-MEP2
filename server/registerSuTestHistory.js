module.exports = function registerSuTestHistory(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  function removeSuTestIDFromNewSuTest() {

    db.collection('newSuTestIDService')
    .update({'userID': req.params.userID},
            {$pull: {'newTest': {'suTestID': req.params.suTestID}}},
    function(err, count, result){
      if (err) throw err;

      /** to pull the suTestIDService and update the test runningNumber \
        * in suTestIDHistory
        */
      db.collection('suTestIDHistory')
      .update({'userID': req.params.userID,
               'testID': req.body.testID},
              {$pull: {'newTest': {'suTestID': req.params.suTestID}}},
      function(err, count, result) {
        if (err) throw err;

          res.json('registered');
      }
    )}
  )}

  function registerSuTest(err, doc) { // callback function
    if (err) throw err;

    if (doc) {

      removeSuTestIDFromNewSuTest();
    }
  }

  db.collection('suTestHistory')
  .insert({'userID': req.params.userID,
           'testID': req.body.testID,
           'suTestNumber': req.body.suTestNumber,
           'suTestID': req.params.suTestID,
           'suTestMode': req.params.suTestMode,
           'suTestStartAt': req.params.suTestStartAt}, registerSuTest);
}
