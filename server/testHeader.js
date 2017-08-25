

module.exports = function testHeader(req, res) {

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

    db.collection('unSubscribeTestHeader').findOne({testID: req.params.testID}, cb);

    function cb(err, doc) {
      if (err) console.log(err)
      else {
        res.json(doc);
      }
    }
  }
