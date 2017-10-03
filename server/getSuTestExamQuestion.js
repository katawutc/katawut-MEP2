module.exports = function getSuTestExamQuestion(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server getSuTestExamQuestion');


  res.json('return from getSuTestExamQuestion');

}
