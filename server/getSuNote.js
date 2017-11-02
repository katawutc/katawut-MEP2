
module.exports = function getSuNote(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();


  function note_cb(err, note) {

    if (err) throw err;

    if (note) {
      console.log(note);

      res.json(note);
    }
  }

  db.collection('suNote')
  .findOne({'userID': req.params.userID,
            'title': req.params.title,
            'noteTime': req.params.noteTime}, note_cb);

}
