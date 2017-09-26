module.exports = function getSuNewTestHeader(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server getSuNewTestHeader')

  console.log(req.params.userID);
  console.log(req.params.testID);

  // test header has running number 01, 02

  // need to refactor to get only required field
  db.collection('suTestHeader').findOne({testID: req.params.testID}, function(err, doc){
    if (err) throw err;
    if (doc) {
      console.log(doc);
      res.json(doc);
    }
  })
}
