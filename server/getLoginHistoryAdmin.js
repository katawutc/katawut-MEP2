var async = require('async');

module.exports = function getLoginHistoryAdmin(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server getLoginHistoryAdmin');

  if (!req.mepAdminAccess) {
    res.json({errorMessage : 'no authority'});
  }

  if (req.mepAdminAccess){

    db.collection('loginHistory').find({userID: req.params.userID},
                                    {sort:{$natural:-1}, limit: 10}).toArray(getLastHistory);
}

  function getLastHistory(err, doc) {
    if (err) throw err;
    if(doc) {
      console.log(doc);
      loginHistory = doc;
    }
      res.json(loginHistory);
  }
}
