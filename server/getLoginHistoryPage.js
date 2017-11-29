module.exports = function getLoginHistoryPage(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var objectID = require('mongodb').ObjectID;

  console.log(req.params.userID);

  console.log(req.params.lastIDCurrentpage);

  function loginHistoryPage_cb(err, loginHistoryPage) {

    if (err) throw err;

    console.log(loginHistoryPage);

    res.json(loginHistoryPage);
  }

  db.collection('loginHistory')
  .find({'userID': req.params.userID,
         '_id': {$lt: objectID(req.params.lastIDCurrentpage)}},
        {sort:{$natural:-1}, limit: 10}).toArray(loginHistoryPage_cb);

}
