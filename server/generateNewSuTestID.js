module.exports = function generateNewSuTestID(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: generateNewSuTestID');

  /**
   * 1. check setting
   * 2. check suNewTestService; testStatus is in here
   * 3. check su new test status e.g. registered?
   * 4. provide suTestID
   */

   if (req.mepSuAccess !== true) {
     res.json({errorMessage: 'no authority'});
   }

   if (req.mepSuAccess === true) {
     // 1. check setting
     db.collection('userSetting').findOne({userID: req.params.userID,
                                           userRole: 'su'}, cb);

     function cb(err, setting) {
       if (err) throw err;
       if (setting) {
            console.log(setting);
            var userID = req.params.userID;
            var testID = setting.userLevel+'-'+
                          setting.userPreferTest+'-'+
                          setting.userPreferSubject;

            var runningNumber = 0;

            db.collection('newSuTestIDService')
            .findOne({userID: req.params.userID}, cb);

        function cb(err, doc) {
          if (err) throw err;
          if (doc === null) {
            insertNewTest(res, db, userID, testID, runningNumber);
            console.log('at server: generateSuNewTest: insertNewSuTestID');
          }
          if (doc !== null ) {

            updateNewTest(res, doc, db, userID, testID, runningNumber);

          }
        }
      }
    }
  }
}

function insertNewTest(res, varDB, varUserID, varTestID, varRunningNumber) {

  var newTest = {userID: varUserID,
                  testID: varTestID,
                  runningNumber: varRunningNumber+2,
                  newTest1: { testID: varTestID,
                              suTestID: varTestID+'-'+(varRunningNumber+1),
                              suTestNumber: varRunningNumber+1,
                              status: 'new'},
                  newTest2: { testID: varTestID,
                              suTestID: varTestID+'-'+(varRunningNumber+2),
                              suTestNumber: varRunningNumber+2,
                              status: 'new'}
                }

  varDB.collection('newSuTestIDService')
  .insert(newTest, function(err, doc){
      if (err) throw err;
      if (doc) {
        var suNewTest = {newTest1: newTest.newTest1,
                          newTest2: newTest.newTest2};
        res.json(suNewTest);
      }
  });
}

function updateNewTest(res, varDoc, varDB, varUserID, varTestID, varRunningNumber) {
  console.log('at server: generateNewSuTestID: updateNewSuTestID');

  if (varDoc.testID === varTestID) {
      res.json({newTest1: varDoc.newTest1,
                newTest2: varDoc.newTest2});
  }

  // implement the new setting testID here


}


/*


      var suTestNumber = 01;

      var testID = req.body.userLevel+'-'+req.body.userPreferTest+'-'+
                    req.body.userPreferSubject;

      var suNewTest01 = testID+'-'+suTestNumber;


    // aggregate->match testID->sample
    db.collection('suTestContent').aggregate([{$match:{testID:testID}},
      {$sample:{size:3}}]).toArray(function(err, doc){

        // to put this doc into the su new test DB <insert>
        // to separate testID and test number <test running number>
        // to insert number of question e.g. 3
        db.collection('suNewTest').insert({userID:req.params.userID,
                                            suTestID: suNewTest01,
                                            suTestSize: 3,
                                            suTest: doc}, function(err, doc){
          // update activate if already done the 1st time setting before
          // need to refactor more
          db.collection('user').update({userID: req.params.userID,
                                          userRole: req.params.userRole},
                                          {$set:{activate: 'true'}}, cb1);
            function cb1(err, doc) {
              if (err) throw err;
              res.json('return from at save setting server');
          }
        })
      });
  }
}



*/







// create testID here
// check testID in suNewTestService DB
// - check userID for current testID,
// - {userID: suerID,
//    testID: xxxxxx,
//     newTest1: {suTestID: xxxx,
//                suTestNumber: xx,
//                status: xx},
//     newTest2: {suTestNumber: xx'
//                status: xx}
//   }
// - if match, do nothing
// - if do not, replace
// check suTestID number
// generate suTestID
