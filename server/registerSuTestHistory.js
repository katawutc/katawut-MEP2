module.exports = function registerSuTestHistory(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: registerSuTestHistory');

  console.log(req.body.testID);
  console.log(req.body.suTestNumber);

  function removeSuTestIDFromNewSuTest() {

    console.log('remove suTestID from newSuTestIDService');

    db.collection('newSuTestIDService')
    .update({userID: req.params.userID},
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
    //need to add more logic checking if fails

    /**
     * 1. Once the test is registered, remove the test name from \
     *    the
     */

    if (doc) {
      removeSuTestIDFromNewSuTest();
    }
  }

  db.collection('suTestHistory')
  .insert({userID: req.params.userID,
            testID: req.body.testID,
            suTestNumber: req.body.suTestNumber,
            suTestID: req.params.suTestID,
            suTestMode: req.params.suTestMode,
            suTestStartAt: req.params.suTestStartAt},
            registerSuTest);

}
