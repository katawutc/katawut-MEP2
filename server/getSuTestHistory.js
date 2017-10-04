module.exports = function getSuTestHistory(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: getSuTestHistory');

  db.collection('suTestHistory').find({userID: req.params.userID})
                                .toArray(function(err, doc) {

    if (err) throw err;
    if (doc) {
      res.json(doc);
    }
  })
}
