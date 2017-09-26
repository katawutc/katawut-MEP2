
module.exports = function suAccountData(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var query = {userID : req.params.userID};

  // check Authorization for su hack
  // to refactor to a middleware
  if (req.user.userRole !== 'su' ||
        req.params.userID !== req.user.userID) {
    res.json({errorMessage: 'no authority'});
  }
  else {
  /** to implement what DB collection to access to get information for the dashboard */
  // access dashboard related DB for dashboard information
  // use session storage for name
    db.collection('user').findOne(query, function(err, doc) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(doc); /** if (null) it will check at angular js */
        }
      })
    }
  }
