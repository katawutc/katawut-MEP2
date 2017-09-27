module.exports = function getSuTestQuestion(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server getSuTestQuestion');

  console.log(req.params.userID);
  console.log(req.params.testID);
  console.log(req.params.suTestQuestionNumber);

  var questionArrayIndex = req.params.suTestQuestionNumber - 1;

  console.log(questionArrayIndex);

  db.collection('suNewTest').findOne({userID: req.params.userID,
                                      testID: req.params.testID}, function(err, doc) {
    if (err) throw err;
    if (doc && doc.test) {
      console.log(doc.test[questionArrayIndex]);
      res.json(doc.test[questionArrayIndex]);
    }
  })
}
