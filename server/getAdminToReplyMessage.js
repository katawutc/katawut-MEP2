module.exports = function getAdminToReplyMessage(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  function getAdminToReplyMessage_cb(err, message) {

    if (err) throw err;

    res.json(message);
  }

  db.collection('suChat')
  .find({'userID': req.params.suID,
         'chatStartAt': parseInt(req.params.chatStartAt)}, {'message': 1})
  .toArray(getAdminToReplyMessage_cb);

}
