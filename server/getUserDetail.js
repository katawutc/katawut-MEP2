var async = require('async');

module.exports = function getUserDetail(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var detail = {};

  if (req.mepAdminAccess){

    // get user name
    db.collection('user').findOne({userID: req.params.userID,
                                    userRole: req.params.userRole}, getUserName);

  }

  function getUserName(err, doc) {
    if (err) throw err;
    if(doc) {
      detail.userName = doc.userName;
    }

    db.collection('userSetting').findOne({userID: req.params.userID,
                                          userRole: req.params.userRole}, getUserSetting);
  }

  function getUserSetting(err, doc) {
    if (err) throw err;
    if(doc) {
      detail.userLevel = doc.userLevel;
      detail.userPreferTest = doc.userPreferTest;
      detail.userPreferSubject = doc.userPreferSubject;
    }

    db.collection('loginHistory').find({userID: req.params.userID},
                                    {sort:{loginTime: -1}, limit: 1}).toArray(getLastLogin);
}

  function getLastLogin(err, doc) {
    if (err) throw err;
    if(doc) {
      detail.userLastLoginMethod = doc[0].loginMethod;
      detail.userLastLoginTime = doc[0].loginTime;
    }
      res.json(detail);
  }
}
