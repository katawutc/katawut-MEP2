module.exports = function deleteSuNote(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var noteTimeStart = parseInt(req.params.noteTimeStart);
  var noteTime = parseInt(req.params.noteTime);

  function suNoteDelete_cb(err, number) {

    if (err) throw err;

    if (number) console.log(number);

    res.json('delete success');

  }

  db.collection('suNote')
  .remove({'userID': req.params.userID,
           'title': req.params.title,
           'noteTimeStart': noteTimeStart,
           'noteTime': noteTime}, suNoteDelete_cb);
}
