module.exports = function getSuTestQuestion(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server getSuTestQuestion');

  console.log(req.params.userID);
  console.log(req.params.suTestID);
  console.log(req.params.suTestQuestionNumber);

  var questionArrayIndex = req.params.suTestQuestionNumber - 1;

  console.log(questionArrayIndex);

  db.collection('suNewTest').findOne({userID: req.params.userID,
                                      suTestID: req.params.suTestID}, function(err, doc) {
    if (err) throw err;
    if (doc && doc.suTest) {
      console.log(doc.suTest[questionArrayIndex]);
      res.json(doc.suTest[questionArrayIndex]);
    }
  })
}
