
module.exports = function dashboard(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var query = {userID : req.params.userID,
                userRole: req.params.userRole};

  /** to implement what DB collection to access to get information for the dashboard */
  db.collection('user').findOne(query, function(err, doc) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(doc); /** if (null) it will check at angular js */
    }
  })
}
