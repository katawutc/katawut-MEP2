module.exports = function generateSuNewTest(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();


  console.log('at server generateSuNewTest');



  res.json('return from server generateSuNewTest');

}
