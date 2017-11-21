
module.exports = function liveSu(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  function liveSu_cb(err, doc) {

    if (err) throw err;

    if (doc) {

      res.json(doc);
    }

  }

  /** main entry */
  db.collection('suChatSocket')
  .find({'userRole': 'su',
         'status': 'live'}).toArray(liveSu_cb);
}
