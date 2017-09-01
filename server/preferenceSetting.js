

module.exports = function preferenceSetting(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server preferenceSetting');

  db.collection('userSetting').findOne({userID: req.params.userID,
                                          userRole: 'su'}, cb);

  function cb(err, doc) {
    if (err) throw err;
    res.json(doc);
  }
}
