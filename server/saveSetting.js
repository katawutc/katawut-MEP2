var objectID = require('mongodb').ObjectID

module.exports = function saveSetting(req, res) {

  // save setting preference into the DB
  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('userSetting').update({userID: req.params.userID,
                                                userRole: req.params.userRole},
                                                  {$set:{userLevel: req.body.userLevel,
                                                      userPreferTest: req.body.userPreferTest,
                                                      userPreferSubject: req.body.userPreferSubject}},
                                                        {upsert: true}, cb);
  function cb(err, doc) {
    if (err) throw err;

    if (doc) {
      res.json('setting is updated at server');
    }
  }
}

    /** get the customize su test content here
      * 1. create a new test name
      * 2. aggregate test content
      * 3. put into the DB for the su
      */

      /**
       * How to implement suTestNumber
       * 1. check test history
       * 2. check
       */
