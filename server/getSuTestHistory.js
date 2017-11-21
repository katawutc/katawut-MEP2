module.exports = function getSuTestHistory(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('suTestHistory')
  .find({'userID': req.params.userID})
  .sort({$natural: -1})
  .toArray(function(err, doc) {

    if (err) throw err;
    if (doc) {
      res.json(doc);
    }
  })
}
