module.exports = function getSuTestReview(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('suNewTest').findOne({userID: req.params.userID,
                                      suTestID: req.params.suTestID},

    function(err, doc) {
      if (err) throw err;
      if (doc) {
        var solutionID = doc.suTest[req.params.suTestQuestionNumber-1].testID;
        var solQuestionNumber = doc.suTest[req.params.suTestQuestionNumber-1].questionNumber;
        db.collection('suSolutionContent').findOne({solutionID: solutionID,
                                                    solQuestionNumber: solQuestionNumber},

          function(err, testReview) {
            if (err) throw err;
            if (testReview) {
              res.json(testReview);
            }
          })
      }
  })
}
