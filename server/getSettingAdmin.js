
module.exports = function getSettingAdmin(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var setting = {};

  if (!req.mepAdminAccess) {
    res.json({errorMessage: 'no authority'});
  }

  if (req.mepAdminAccess){

    // get user name
    db.collection('userSetting').findOne({userID: req.params.userID,
                                    userRole: req.params.userRole}, getSetting);
  }

  function getSetting(err, doc) {
    if (err) throw err;
    if(doc) {
      setting.userLevel = doc.userLevel;
      setting.userPreferTest = doc.userPreferTest;
      setting.userPreferSubject = doc.userPreferSubject;
    }
      res.json(setting);
  }
}


/*


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

*/
