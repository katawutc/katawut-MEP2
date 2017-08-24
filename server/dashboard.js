var objectID = require('mongodb').ObjectID;

module.exports = function dashboard(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var query = {userID : objectID(req.params.userID),
                userRole: req.params.userRole};

  console.log(query);

  /** to implement what DB collection to access to get information for the dashboard */
  db.collection('user').findOne(query, function(err, doc) {
    if (err) {
      res.json(err);
    }
    else {
      console.log(doc);
      res.json(doc); /** if (null) it will check at angular js */
    }
  })
}
