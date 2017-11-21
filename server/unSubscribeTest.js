module.exports = function activateAccount(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('unSubscribeTestContent')
  .findOne({'testID': req.params.testID,
            'questionNumber': req.params.questionNumber}, cb);

    function cb(err, doc) {
      if (err) res.json(err);
      else {
        res.json(doc);
      }
    }
}
