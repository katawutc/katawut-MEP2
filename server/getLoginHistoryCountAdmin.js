module.exports = function getLoginHistoryCountAdmin(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: getLoginHistoryCountAdmin');


  function loginHistiryCount_cb(err, loginCount) {

    if (err) throw err;

    console.log(loginCount);

    res.json(loginCount);
  }

  db.collection('loginHistory')
  .find({'userID': req.params.userID})
  .count(loginHistiryCount_cb);

}
