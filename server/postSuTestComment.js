module.exports = function postSuTestComment(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  function postComment_cb(err, doc) {

    if (err) throw err;
    if (doc) console.log(doc);

    res.json('post comment successfully');
  }

  db.collection('suTestComment')
  .insert({'userID': req.body.userID,
           'testID': req.body.testID,
           'questionNumber': req.body.questionNumber,
           'commentTime': req.body.commentTime,
           'comment': req.body.comment}, postComment_cb)
}
