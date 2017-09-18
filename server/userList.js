
module.exports = function userList(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log(req.user);

  if (req.user.userRole === 'ad') {
    db.collection('user').find({}, {userID:1, userName:1, userRole:1, _id:0}).toArray(function(err, doc) {
      if (err) throw err;
      // to send a list of userID, userName, userRole
      else {
        console.log(doc);
        res.json(doc);
      }
    })
  }
  else {
    res.json({errorMessage: 'no authority'});
  }
}
