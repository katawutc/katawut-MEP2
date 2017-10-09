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

            // find the userID in the newSuTestIDService DB
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

  var newSuTest = {userID: varUserID,
                  testID: varTestID,
                  runningNumber: varRunningNumber+2,
                  newTest: [{ testID: varTestID,
                              suTestID: varTestID+'-'+(varRunningNumber+1),
                              suTestNumber: varRunningNumber+1,
                              status: 'new'},
                            { testID: varTestID,
                              suTestID: varTestID+'-'+(varRunningNumber+2),
                              suTestNumber: varRunningNumber+2,
                              status: 'new'}]
                }

  console.log(newSuTest);

  varDB.collection('newSuTestIDService')
  .insert(newSuTest, function(err, doc){
      if (err) throw err;
      if (doc) {
        console.log(doc);
        var suNewTest = {newTest1: newSuTest.newTest[0],
                          newTest2: newSuTest.newTest[1]};
        res.json(suNewTest);
      }
  });
}

function updateNewTest(res, varDoc, // current testID
                        varDB, varUserID, // new testID
                        varTestID, varRunningNumber) {
  console.log('at server: generateNewSuTestID: updateNewSuTestID');

  if (varDoc.testID === varTestID) {
      res.json({newTest1: varDoc.newTest[0],
                newTest2: varDoc.newTest[1]});
  }

  // implement the new setting testID here
  if (varDoc.testID !== varTestID) {

    /**
     * 1. check if testID is existed in the suTest DB and it's current running number
     * 2. if testID not existed in the suTest DB, generate a new one
     */

     console.log('at varDoc.testID !== varTestID');
     console.log(varDoc.testID);
     console.log(varTestID);

/*
     var newSuTestID = {testID: varTestID,
                        runningNumber: varRunningNumber+2,
                        newTest1: { testID: varTestID,
                          suTestID: varTestID+'-'+(varRunningNumber+1),
                          suTestNumber: varRunningNumber+1,
                          status: 'new'},
                        newTest2: { testID: varTestID,
                          suTestID: varTestID+'-'+(varRunningNumber+2),
                          suTestNumber: varRunningNumber+2,
                          status: 'new'}}
                          */


     varDB.collection('newSuTestIDService')
     .update({userID: varUserID},
     {
       $set:{
         testID: varTestID,
         runningNumber: varRunningNumber+2,
         newTest: [{ testID: varTestID,
                     suTestID: varTestID+'-'+(varRunningNumber+1),
                     suTestNumber: varRunningNumber+1,
                     status: 'new'},
                   { testID: varTestID,
                     suTestID: varTestID+'-'+(varRunningNumber+2),
                     suTestNumber: varRunningNumber+2,
                     status: 'new'}]
       }
     },
     { upsert: true }, cb);

     function cb(err, count, doc) {
       if (err) throw err;

       varDB.collection('newSuTestIDService')
       .findOne({userID: varUserID}, function(err, doc) {
         res.json({newTest1: doc.newTest[0],
                   newTest2: doc.newTest[1]});
       })
     }
   } // if (varDoc.testID !== varTestID)
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
