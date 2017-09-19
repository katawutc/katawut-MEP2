

module.exports = function getUserDetail(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  if (req.mepAdminAccess){
    res.json('done getUserDetail');
  }
}
