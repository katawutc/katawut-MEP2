
module.exports = function getSuNoteList(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: getSuNoteList: '+req.params.userID);

  function cb(err, noteList) {

    if (err) throw err;

    if (noteList) {

      console.log(noteList);
      res.json(noteList);
    }
  }

  db.collection('suNote')
  .find({userID: req.params.userID})
  .toArray(cb);

}
