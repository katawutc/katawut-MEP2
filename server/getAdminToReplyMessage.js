module.exports = function getAdminToReplyMessage(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log(req.params.adID);
  console.log(req.params.suID);
  console.log(req.params.chatStartAt);

  function getAdminToReplyMessage_cb(err, message) {

    if (err) throw err;

    console.log(message);

    res.json(message);
  }

  db.collection('suChat')
  .find({'userID': req.params.suID,
         'chatStartAt': parseInt(req.params.chatStartAt)}, {'message': 1})
  .toArray(getAdminToReplyMessage_cb);

}
