module.exports = function generateSuNewTest(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: generateSuNewTest');



  res.json('su new test is generated from server');


}
