
module.exports = function getSuNote(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: getSuNote');

  console.log(req.params.userID);
  console.log(req.params.title);
  console.log(req.params.noteTime);

  var noteTime = parseInt(req.params.noteTime);

  console.log(noteTime);


  function note_cb(err, note) {

    if (err) throw err;

    if (note) {
      console.log(note);

      res.json(note);
    }
    else {
      res.json('note not found');
    }
  }

  db.collection('suNote')
  .findOne({'userID': req.params.userID,
            'title': req.params.title,
            'noteTime': noteTime}, note_cb);

}
