

module.exports = function setting(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('userSetting').findOne({userID: req.params.userID,
                                        userRole: 'su'}, cb);

  function cb(err, doc) {
    if (err) throw err;
    console.log(doc);
    res.json(doc);
  }
}
