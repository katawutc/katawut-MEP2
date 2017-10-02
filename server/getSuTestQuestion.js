module.exports = function getSuTestQuestion(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var questionArrayIndex = req.params.suTestQuestionNumber - 1;

  db.collection('suNewTest').findOne({userID: req.params.userID,
                                      suTestID: req.params.suTestID}, function(err, doc) {
    if (err) throw err;
    if (doc && doc.suTest) {
      res.json(doc.suTest[questionArrayIndex]);
    }
  })
}
