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

  /**
    * 1. if page change is next to the previous one
    * 1a. if page is greater than the previous one
    * 1b. if page is lesser than the previous one
    * 2. if page change is not next to the previous one
    */

  var newPage = parseInt(req.params.newPage);
  console.log(newPage);

  var previousPage = parseInt(req.params.previousPage);
  console.log(previousPage);

  if (newPage > previousPage && ( (newPage-previousPage) === 1) ) {

    db.collection('loginHistory')
    .find({'userID': req.params.userID,
           '_id': {$lt: objectID(req.params.lastIDCurrentpage)}},
          {sort:{$natural:-1}, limit: 10}).toArray(loginHistoryPage_cb);
  }
  else if (newPage < previousPage && ( (previousPage-newPage) === 1) ) {

    db.collection('loginHistory')
    .find({'userID': req.params.userID,
           '_id': {$gt: objectID(req.params.lastIDCurrentpage)}},
          {sort:{$natural:-1}, limit: 10}).toArray(loginHistoryPage_cb);
  }

}
