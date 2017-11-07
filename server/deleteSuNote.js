module.exports = function deleteSuNote(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: deleteSuNote');

  console.log(req.params.userID);
  console.log(req.params.title);

  var noteTime = parseInt(req.params.noteTime);

  console.log(noteTime);


  function suNoteDelete_cb(err, number) {

    if (err) throw err;

    if (number) console.log(number);

    res.json('delete success');

  }

  db.collection('suNote')
  .remove({'userID': req.params.userID,
           'title': req.params.title,
           'noteTime': noteTime}, suNoteDelete_cb);
}
