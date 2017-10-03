
module.exports = function submitAnswerSuTestExamMode(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('suTestHistory').update({userID: req.body.userID,
                                          suTestID: req.body.suTestID,
                                          suTestMode: req.body.suTestMode,
                                          suTestStartAt: req.body.suTestStartAt,
                                          suTestQuestionNumber: req.body.suTestQuestionNumber},
                                              { $set:
                                                { suTestQuestionStatus: req.body.suTestQuestionStatus,
                                                  suTestAnswer: req.body.suTestAnswer,
                                                  suTestQuestionStatus: 'answered'}
                                              }, cb);
    function cb (err, doc) {
      if (err) throw err;
      else {
        // checking answer and update the score here
        var solutionID = req.body.testID;
        var questionNumber = req.body.questionNumber;
        var solution;
        var userAnswer = req.body.suTestAnswer;

        // Retrieve Solution from the DB
        db.collection('suSolutionContent').findOne({solutionID: solutionID,
                                                    solQuestionNumber: questionNumber},
                                                    cb); /*function (err, doc) { */
        function cb(err, solDoc) {

          if (err) throw err;
          else {
            solution = solDoc.solution;

            if (solution === userAnswer) {
              db.collection('suTestHistory').update({userID: req.body.userID,
                                                      suTestID: req.body.suTestID,
                                                      suTestMode: req.body.suTestMode,
                                                      suTestStartAt: req.body.suTestStartAt,
                                                      suTestQuestionNumber: req.body.suTestQuestionNumber},
                                                          { $set: {suTestResult: 'correct'}});
            }
            else {
              db.collection('suTestHistory').update({userID: req.body.userID,
                                                      suTestID: req.body.suTestID,
                                                      suTestMode: req.body.suTestMode,
                                                      suTestStartAt: req.body.suTestStartAt,
                                                      suTestQuestionNumber: req.body.suTestQuestionNumber},
                                                          { $set: {suTestResult: 'wrong'}});
            }
          }
        }
        res.json('answer recorded');
      }
    }

}
