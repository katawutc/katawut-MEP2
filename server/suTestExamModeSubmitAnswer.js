
module.exports = function suTestExamModeSubmitAnswer(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log(' at server suTestExamModeSubmitAnswer');



  res.json('return from suTestExamModeSubmitAnswer');


}
