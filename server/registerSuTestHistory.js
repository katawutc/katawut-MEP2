module.exports = function registerSuTestHistory(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: registerSuTestHistory');

  db.collection('suTestHistory').insert({userID: req.params.userID,
                                          suTestID: req.params.suTestID,
                                          suTestMode: req.params.suTestMode,
                                          suTestStartAt: req.params.suTestStartAt}, cb);

  function cb(err, doc) {
    if (err) throw err;
    //need to add more logic checking if fails

    res.json('registered');
  }

}
