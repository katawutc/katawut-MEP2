module.exports = function createSuExamSheet(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server createSuExamSheet')
  console.log(req.params);


  res.json('return from createSuExamSheet');

}
