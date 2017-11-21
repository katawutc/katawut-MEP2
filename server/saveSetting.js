
module.exports = function saveSetting(req, res) {

  // save setting preference into the DB
  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

    function updateSetting_cb(err, doc) {
      if (err) throw err;

      if (doc) {

        res.json('setting is updated at server');
      }
    }

  db.collection('userSetting')
  .findAndModify({'userID': req.params.userID,
                  'userRole': req.params.userRole},
                  [],
                 {$set: {'userLevel': req.body.userLevel,
                         'userPreferTest': req.body.userPreferTest,
                         'userPreferSubject': req.body.userPreferSubject}},
                 {new: true},
                 {upsert: true}, updateSetting_cb);
}
