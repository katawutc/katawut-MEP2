
module.exports = function submitAnswerSuTestExamMode(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log(' at server submitAnswerSuTestExamMode');



  res.json('return from submitAnswerSuTestExamMode');


}
