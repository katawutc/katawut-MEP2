module.exports = function firstSetting(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();


  function activateAccount_cb(err, doc) {
    if (err) throw err;

    if (doc) {

      res.json('first setting is done at server');
    }
  }

  function firstSetting_cb(err, doc) {
    if (err) throw err;

    if (doc) {

      db.collection('user')
      .findAndModify({'userID': req.params.userID,
                      'userRole': req.params.userRole},
                      [],
                     {$set: {'activate': true}},
                     {new: true},
                     {upsert: true}, activateAccount_cb);
    }
  }

  /** main entry point for firstSetting */
  db.collection('userSetting')
  .findAndModify({'userID': req.params.userID,
                  'userRole': req.params.userRole},
                  [],
                 {$set: {'userLevel': req.body.userLevel,
                         'userPreferTest': req.body.userPreferTest,
                         'userPreferSubject': req.body.userPreferSubject}},
                 {new: true},
                 {upsert: true}, firstSetting_cb);

  }
