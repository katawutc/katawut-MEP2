module.exports = function registerSuTestHistory(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: registerSuTestHistory');


  function removeSuTestIDFromNewSuTest() {

    console.log('remove suTestID from newSuTestIDService');

    db.collection('newSuTestIDService')
    .update({userID: req.params.userID},
            {$pull: {'newTest': {'suTestID': req.params.suTestID}}},
    function(err, doc){
      if (err) throw err;
      if (doc) {
        console.log(doc);
        res.json('registered');
      }
    })
  }

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
            suTestID: req.params.suTestID,
            suTestMode: req.params.suTestMode,
            suTestStartAt: req.params.suTestStartAt},
            registerSuTest);


}
