
module.exports = function getSuNote(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var noteTimeStart = parseInt(req.params.noteTimeStart);
  var noteTime = parseInt(req.params.noteTime);

  function note_cb(err, note) {

    if (err) throw err;

    if (note) {

      res.json(note);
    }
    else {
      res.json('note not found');
    }
  }

  db.collection('suNote')
  .findOne({'userID': req.params.userID,
            'title': req.params.title,
            'noteTimeStart': noteTimeStart,
            'noteTime': noteTime}, note_cb);

}
