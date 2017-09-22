

module.exports = function preferenceSetting(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server preferenceSetting');

  console.log(req.mepSuAccess);

  if (req.mepSuAccess) {

    db.collection('userSetting').findOne({userID: req.params.userID,
                                          userRole: 'su'}, cb);

    function cb(err, doc) {
      if (err) throw err;
        console.log('found user setting');
        console.log(doc);
        res.json(doc);
      }
    }
    else {
      res.json({errorMessage: 'no authority'});
    }
}
