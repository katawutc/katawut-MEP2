module.exports = function getSuNewTestHeader(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  // test header has running number 01, 02

  // need to refactor to get only required field
  db.collection('suTestHeader')
  .findOne({'testID': req.params.testID}, function(err, doc){
    
    if (err) throw err;
    if (doc) {

      res.json(doc);
    }
  })
}
