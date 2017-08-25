
module.exports = function activateAccount(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();


    db.collection('unSubscribeUserTestResult').find({userID: req.params.userID,
                                                     testID: req.params.testID,
                                                     testMode: req.params.testMode,
                                                     testStartAt: req.params.testStartAt}).toArray(cb);

      function cb(err, doc) {
        if (err) throw err;
        else {
          res.json(doc);
        }
      }
  }
