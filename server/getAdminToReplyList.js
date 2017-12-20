module.exports = function getAdminToReplyList(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  function getAdminToReplyList_cb(err, toReplyList) {

    if (err) throw err;

    console.log(toReplyList);

    res.json(toReplyList);
  }

  db.collection('suChat')
  .find({'message': {$elemMatch:{'sentSuccess': false}}}, {'userID':1, 'chatStartAt': 1})
  .toArray(getAdminToReplyList_cb);
}
