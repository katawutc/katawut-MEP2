module.exports = function getSuNewTestInfo(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server getSuNewTestInfo')

  console.log(req.params.userID);
  console.log(req.params.testID);

  db.collection('suNewTest').findOne({userID: req.params.userID,
                                      testID: req.params.testID}, function(err, doc) {

    if (err) throw err;
    console.log(doc);
    res.json(doc);
  })
}
