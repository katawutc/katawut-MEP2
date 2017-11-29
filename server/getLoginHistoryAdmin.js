
module.exports = function getLoginHistoryAdmin(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  if (!req.mepAdminAccess) {
    res.json({errorMessage : 'no authority'});
  }

  function getLastHistory_cb(err, loginHistory) {

    if (err) throw err;

    console.log(loginHistory);

    res.json(loginHistory);
  }

  if (req.mepAdminAccess){

    db.collection('loginHistory')
    .find({'userID': req.params.userID})
    .sort({'_id': -1})
    .limit(10).toArray(getLastHistory_cb);
  }
}
