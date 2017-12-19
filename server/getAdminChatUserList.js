
module.exports = function getAdminChatUserList(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  // to put the authority checking here

  /** to do pagination similar to getLoginHistoryPage.js */

  if (req.user.userRole !== 'ad' ||
        req.user.userID !== req.params.userID) {

          res.json({errorMessage: 'no authority'});
        }
  else if (req.user.userRole === 'ad' &&
        req.user.userID === req.params.userID) {

          db.collection('user')
          .find({}, {userID:1, userName:1, userRole:1, _id:0}).toArray(function(err, doc) {
            if (err) throw err;
            // to send a list of userID, userName, userRole
            else {

              res.json(doc);
            }
          })
  }
  else {
    res.json({errorMessage: 'no authority'});
  }
}
