module.exports = function getSuNewTestInfo(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var testQuery = req.params.testID+'-'+req.params.testRunningNumber;

  db.collection('suNewTest').findOne({userID: req.params.userID,
                                      testID: testQuery}, function(err, doc) {

    if (err) throw err;
    console.log(doc);
    res.json(doc);
  })
}
