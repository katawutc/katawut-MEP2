module.exports = function getSuTestExamQuestion(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  // the implementation duplicate with getSuTestQuestion
  var questionArrayIndex = req.params.suTestQuestionNumber - 1;

  function getTestQuestion_cb(err, question) {
    if (err) throw err;

    // need to refactor for null and error case

    if (question) {
      console.log(question);
      res.json(question);
    }
  }

  function getTestQuestion(testID, suQuestion) {
    db.collection('suTestContent')
    .findOne({'testID': testID,
              'questionNumber': suQuestion.questionNumber}, getTestQuestion_cb);
  }

  function getTestQuestionNumber_cb(err, test) {
    if (test && test.suTest) {

      getTestQuestion(test.suTest[questionArrayIndex].testID, test.suTest[questionArrayIndex]);
    }
  }

  db.collection('newSuTest')
  .findOne({'userID': req.params.userID,
            'suTestID': req.params.suTestID}, getTestQuestionNumber_cb);

}
