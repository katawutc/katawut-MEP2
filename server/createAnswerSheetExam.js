
module.exports = function createAnswerSheetExam(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

   for(var i = 1; i <= req.body.numberOfQuestion; i++) {

     var questionNumber = i.toString();

     db.collection('examAnswerSummary')
     .insert({'userName': req.body.userName,
              'userID': req.body.userID,
              'testID': req.body.testID,
              'testMode': req.body.testMode,
              'testStartAt': req.body.testStartAt,
              'questionNumber': questionNumber}, cb);
              
     function cb(err, doc) {
       if (err) throw err;
       else {
         //console.log('empty answer sheet is created for '+questionNumber);
       }
     }
   }
   res.json('return createAnswerSheetExam');
}
