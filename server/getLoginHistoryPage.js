module.exports = function getLoginHistoryPage(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var objectID = require('mongodb').ObjectID;

  console.log('userID: '+req.params.userID);

  console.log('markIDCurrentPage: '+req.params.markIDCurrentPage);

  function loginHistoryPage_cb(err, loginHistoryPage) {

    if (err) throw err;

    console.log(loginHistoryPage);

    // less than 10 case
    var quotient = Math.floor((loginHistoryPage.length)/10);

    var remainder = loginHistoryPage.length % 10;

    console.log('quotient: '+quotient);

    console.log('remainder: '+remainder);

    if (quotient === 0) {

      console.log('at loginHistoryPage_cb: quotient === 0');

      console.log(loginHistoryPage);

      res.json(loginHistoryPage);
    }
    else if (quotient === 1 && remainder === 0) {

      console.log('at loginHistoryPage_cb: quotient === 1 && remainder === 0');

      console.log(loginHistoryPage);

      res.json(loginHistoryPage);
    }
    else if (quotient === 1 && remainder > 0) {

      console.log('at loginHistoryPage_cb: quotient === 1 && remainder > 0');

      loginHistoryPage.splice(0, 10);

      console.log(loginHistoryPage);

      res.json(loginHistoryPage);
    }
    else if (quotient > 1 && remainder === 0) {

      console.log('at loginHistoryPage_cb: quotient > 1 && remainder === 0');

      loginHistoryPage.splice(0, 10*(quotient-1));

      console.log(loginHistoryPage);

      res.json(loginHistoryPage);
    }
    else if (quotient > 1 && remainder > 0) {

      console.log('at loginHistoryPage_cb: quotient > 1 && remainder > 0');

      loginHistoryPage.splice(0, 10*quotient);

      console.log(loginHistoryPage);

      res.json(loginHistoryPage);
    }
  }

  function loginHistoryPageReverse_cb(err, loginHistoryPage) {

    if (err) throw err;

    loginHistoryPage.reverse();

    console.log(loginHistoryPage);

    // less than 10 case
    var quotient = Math.floor((loginHistoryPage.length)/10);

    var remainder = loginHistoryPage.length % 10;

    console.log(quotient);

    console.log(remainder);

    if (quotient === 0) {

      console.log('at loginHistoryPageReverse_cb: quotient === 0');

      console.log(loginHistoryPage);

      res.json(loginHistoryPage);
    }
    else if (quotient === 1 && remainder === 0) {

      console.log('at loginHistoryPageReverse_cb: quotient === 1 && remainder === 0');

      console.log(loginHistoryPage);

      res.json(loginHistoryPage);
    }
    else if (quotient > 1 && remainder === 0) {

      console.log('at loginHistoryPageReverse_cb: quotient > 1 && remainder === 0');

      loginHistoryPage.splice(((quotient-1)*10)-1, 10*(quotient-1));

      console.log(loginHistoryPage);

      res.json(loginHistoryPage);
    }
  }

  /**
    * 1. if page change is next to the previous one
    * 1a. if page is greater than the previous one
    * 1b. if page is lesser than the previous one
    * 2. if page change is not next to the previous one
    */

  var newPage = parseInt(req.params.newPage);
  console.log('newPage: '+newPage);

  var previousPage = parseInt(req.params.previousPage);
  console.log('previousPage: '+previousPage);

  if (newPage > previousPage && ( (newPage-previousPage) === 1) ) {

    console.log('at newPage > previousPage && ( (newPage-previousPage) === 1)');

    db.collection('loginHistory')
    .find({'userID': req.params.userID,
           '_id': {$lt: objectID(req.params.markIDCurrentPage)}})
    .sort({'_id':-1})
    .limit(10).toArray(loginHistoryPage_cb);
  }
  else if (newPage > previousPage && ( (newPage-previousPage) !== 1) ) {

    console.log('at newPage > previousPage && ( (newPage-previousPage) !== 1)');

    var pageDiff = newPage-previousPage;

    console.log('pageDiff: '+pageDiff);

    db.collection('loginHistory')
    .find({'userID': req.params.userID,
           '_id': {$lt: objectID(req.params.markIDCurrentPage)}})
    .sort({'_id':-1})
    .limit(pageDiff*10).toArray(loginHistoryPage_cb);

  }
  else if (newPage < previousPage && ( (previousPage-newPage) === 1) ) {

    console.log('newPage < previousPage && ( (previousPage-newPage) === 1)');

    db.collection('loginHistory')
    .find({'userID': req.params.userID,
           '_id': {$gt: objectID(req.params.markIDCurrentPage)}})
    .sort({'_id':1})
    .limit(10).toArray(loginHistoryPageReverse_cb);
  }
  else if (newPage < previousPage && ( (previousPage-newPage) !== 1) ) {

    console.log('at newPage < previousPage && ( (newPage-previousPage) !== 1)');

    var pageDiff = previousPage-newPage;

    console.log('pageDiff :'+pageDiff);

    db.collection('loginHistory')
    .find({'userID': req.params.userID,
           '_id': {$gt: objectID(req.params.markIDCurrentPage)}})
    .sort({'_id':1})
    .limit(pageDiff*10).toArray(loginHistoryPageReverse_cb);
  }

}
