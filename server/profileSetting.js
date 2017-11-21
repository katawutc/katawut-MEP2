

module.exports = function profileSetting(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('user')
  .findOne({'userID': req.params.userID,
            'userRole': 'su'}, cb);

  function cb(err, doc) {
    if (err) throw err;
    var userProfile = {'userName': doc.userName,
                       'userID': doc.userID};
    res.json(userProfile);
  }
}
