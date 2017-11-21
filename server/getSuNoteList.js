
module.exports = function getSuNoteList(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  function suNote_cb(err, noteList) {

    if (err) throw err;

    if (noteList) {

      res.json(noteList);
    }
  }

  db.collection('suNote')
  .find({'userID': req.params.userID})
  .sort({$natural: -1})
  .toArray(suNote_cb);

}
