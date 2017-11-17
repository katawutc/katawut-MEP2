
module.exports = function realTimeUser(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  function countUser_cb(err, count) {

    if (err) throw err;

    res.json(count);
  }

  db.collection('realTimeUser')
  .find({'userRole': req.params.user,
         'status': 'live'}).count(countUser_cb);

}
