var async = require('async');

module.exports = function getUserDetail(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  if (req.mepAdminAccess){

    // get user name
    db.collection('user').findOne({userID: req.params.userID,
                                    userRole: req.params.userRole}, getUserName);

    // get user preference setting


  }


  function getUserName(err, doc) {
    if (err) throw err;
    if(doc) {
      res.json(doc.userName);
    }
  }


}
