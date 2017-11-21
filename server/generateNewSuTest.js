module.exports = function generateNewSuTest(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  /**
   * 1. to check if suTestID is already generated ?
   * 2. to check which questionNumber in the question pool \
   *    is already taken ?
   * 3. how to determine which one is already taken ?
   */

  var suTestID = req.params.testID+'-'+req.params.testRunningNumber;

  function suTestInsertion_cb(err, doc){

    if (err) throw err;
    else {
      res.json({suTestID: req.params.testID+'-'+req.params.testRunningNumber,
      suTestSize: 3});
    }
  }

  function manageNewSuTest_cb(err, suTest){

      // to put this doc into the su new test DB <insert>
      // to separate testID and test number <test running number>
      // to insert number of question e.g. 3

      // log question number already taken
      var questionTaken = [];
      for (var i=0; i<suTest.length; i++){
         questionTaken.push(suTest[i].questionNumber);
      }

      db.collection('suTestQuestionExclude')
      .update({'userID': req.params.userID,
               'testID': req.params.testID},
               {
                 $push: { questionExclude: { $each: questionTaken}}
               }, insertSuTest_cb);

     function insertSuTest_cb(err, count, doc) {
       db.collection('newSuTest')
       .insert({'userID':req.params.userID,
                'suTestID': suTestID,
                'suTestSize': 3,
                'suTest': suTest}, suTestInsertion_cb);
     }
   }

  function generateNewSuTest(questionExclude) {
    // aggregate->project->match testID->sample
    db.collection('suTestContent')
    .aggregate([{$project: {'testID': 1, 'questionNumber': 1}},
                {$match:{'testID':req.params.testID,
                         'questionNumber': {$nin: questionExclude}}},
                         {$sample:{size:3}}]).toArray(manageNewSuTest_cb);
  }

   function generateNewSuTest_cb(err, doc) {

      if (err) throw err;

      generateNewSuTest([]);
    }


    function manageSuTestQuestionExclude_cb(err, excludeQuestionList) {
      if (err) throw err;
      if (excludeQuestionList !== null) {

        generateNewSuTest(excludeQuestionList.questionExclude);
      }
      else if (excludeQuestionList === null) {
        db.collection('suTestQuestionExclude')
        .insert({'userID': req.params.userID,
                 'testID': req.params.testID,
                 'questionExclude': []}, generateNewSuTest_cb);

      }
    }

  function checkSuTestQuestionExclude() {
    db.collection('suTestQuestionExclude')
    .findOne({'userID': req.params.userID,
              'testID': req.params.testID}, manageSuTestQuestionExclude_cb);
  }

  function checkSuTestExisting_cb(err, doc) {
    if (err) throw err;
    if (doc !== null) {
      res.json({'suTestID': req.params.testID+'-'+req.params.testRunningNumber,
                'suTestSize': 3});
    }
    else if (doc === null) {

      /** need to check questionNumber exclusiveness here before \
       *  generate a new test
       */

      checkSuTestQuestionExclude();

    }
  }

   /** main entry of this module */
   /** 1. to check if suTestID is already generated ? */
   db.collection('newSuTest')
   .findOne({'userID': req.params.userID,
             'suTestID': suTestID}, checkSuTestExisting_cb);

 }
