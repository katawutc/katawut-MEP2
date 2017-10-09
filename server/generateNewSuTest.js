module.exports = function generateNewSuTest(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();


  console.log('at server generateNewSuTest');



  res.json('return from server generateNewSuTest');

}
