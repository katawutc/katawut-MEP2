
module.exports = function examAnswerSummary(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('examAnswerSummary').update({userName: req.body.userName,
                                              userID: req.body.userID,
                                              testID: req.body.testID,
                                              testMode: req.body.testMode,
                                              testStartAt: req.body.testStartAt,
                                              questionNumber: req.body.questionNumber},
                                              { $set:
                                                { status: req.body.status,
                                                  userAnswer:req.body.answer,
                                                  questionStartAt: req.body.currentQuestionStartAt,
                                                  questionFinishAt: req.body.currentQuestionFinishAt}
                                              }, cb);
    function cb (err, doc) {
      if (err) throw err;
      else {
        // checking answer and update the score here
        var solutionID = req.body.testID;
        var questionNumber = req.body.questionNumber;
        var solution;
        var userAnswer = req.body.answer;

        // Retrieve Solution from the DB
        db.collection('unSubscribeSolutionContent').findOne({solutionID: solutionID,
                                                  solQuestionNumber: questionNumber},
                                                  cb); /*function (err, doc) { */
        function cb(err, solDoc) {

          if (err) throw err;
          else {
            solution = solDoc.solution;

            if (solution === userAnswer) {
              db.collection('examAnswerSummary').update({userName: req.body.userName,
                                                          userID: req.body.userID,
                                                          testID: req.body.testID,
                                                          testMode: req.body.testMode,
                                                          testStartAt: req.body.testStartAt,
                                                          questionNumber: req.body.questionNumber},
                                                          { $set: {result: 'correct'}});
            }
            else {
              db.collection('examAnswerSummary').update({userName: req.body.userName,
                                                          userID: req.body.userID,
                                                          testID: req.body.testID,
                                                          testMode: req.body.testMode,
                                                          testStartAt: req.body.testStartAt,
                                                          questionNumber: req.body.questionNumber},
                                                          { $set: {result: 'wrong'}});
            }
          }
        }
        res.json('answer recorded');
      }
    }
}
