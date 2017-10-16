module.exports = function getSuNewTestInfo(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var suTestQuery = req.params.testID+'-'+req.params.testRunningNumber;

  db.collection('newSuTest').findOne({userID: req.params.userID,
                                      suTestID: suTestQuery}, function(err, doc) {

    if (err) throw err;

    if (doc) {
      res.json(doc);
    }
    else {
      res.json({error: 'no document found'});
    }
  })
}
