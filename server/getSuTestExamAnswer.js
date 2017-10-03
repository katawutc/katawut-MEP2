module.exports = function getSuTestExamAnswer(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server getSuTestExamAnswer');


  res.json('return from getSuTestExamAnswer');

}
