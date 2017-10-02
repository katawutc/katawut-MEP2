

module.exports = function preferenceSetting(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  if (req.mepSuAccess) {

    db.collection('userSetting').findOne({userID: req.params.userID,
                                          userRole: 'su'}, cb);

    function cb(err, doc) {
      if (err) throw err;
        res.json(doc);
      }
    }
    else {
      res.json({errorMessage: 'no authority'});
    }
}
