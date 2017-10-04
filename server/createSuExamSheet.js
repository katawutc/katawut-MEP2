module.exports = function createSuExamSheet(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  for(var i = 1; i <= req.body.suTestSize; i++) {

    var suTestQuestionNumber = i.toString();

    //suTestHistory
    db.collection('suTestAnswerSheet').insert({userID: req.body.userID,
                                            suTestID: req.body.suTestID,
                                            suTestMode: req.body.suTestMode,
                                            suTestStartAt: req.body.suTestStartAt,
                                            suTestAnswer: null,
                                            suTestResult: 'wrong',
                                            suTestQuestionStatus: 'unanswered',
                                            suTestQuestionNumber: suTestQuestionNumber}, cb);
       function cb(err, doc) {
         if (err) throw err;
         else {
           //console.log('empty answer sheet is created for '+suTestQuestionNumber);
         }
       }
  }

  res.json('return from createSuExamSheet');

}
