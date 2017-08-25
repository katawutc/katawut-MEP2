
module.exports = function activateAccount(req, res) {

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

    db.collection('unSubscribeUser').insert({userName: 'unSubscribe',
                                              testID: req.body.testID,
                                              testMode: req.body.testMode,
                                              accessTime: req.body.accessTime}, cb);
    function cb(err, doc) {
      if (err) throw err;
      else {
        var userID = doc.insertedIds[0];
        db.collection('unSubscribeUser').update({_id:userID}, {$set:{userID: userID}});
        res.json({userName: 'unSubscribe',
                  userID: userID});
                }
  }
}
