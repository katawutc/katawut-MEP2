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

   var userID;
   var testID;
   var runningNumber;


   function insertNewTest(varUserID, varTestID, varRunningNumber) {

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

     db.collection('newSuTestIDService')
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

   function updateNewTest(varDoc, // current testID
                           varUserID, // new testID
                           varTestID, varRunningNumber) {
     console.log('at server: generateNewSuTestID: updateNewSuTestID');

     console.log(varDoc.newTest.length);


     /** there will be 2 new tests presented at one time */
     if (varDoc.testID === varTestID && varDoc.newTest.length === 2) {
         res.json({newTest1: varDoc.newTest[0],
                   newTest2: varDoc.newTest[1]});
     }

     if (varDoc.testID === varTestID && varDoc.newTest.length === 1) {
         // set new runningNumber + 1
         // push new test into the array

         var currentRunningNumber = varDoc.runningNumber;
         console.log(currentRunningNumber);
         var newRunningNumber = currentRunningNumber + 1;

         console.log('at varDoc.testID === varTestID && varDoc.newTest.length === 1');

         db.collection('newSuTestIDService')
         .update({userID: varUserID,
                  testID: varTestID},
                 {$set: {runningNumber: newRunningNumber},
                  $push: {newTest: {testID: varTestID,
                                    suTestID: varTestID+'-'+newRunningNumber,
                                    suTestNumber: newRunningNumber,
                                    status: 'new'}}},
          function(err, count, doc) {
            if (err) throw err;

            db.collection('newSuTestIDService')
            .findOne({userID: varUserID,
                     testID: varTestID},
            function(err, doc) {
              if (err) throw err;
              if (doc) {
                res.json({newTest1: doc.newTest[0],
                          newTest2: doc.newTest[1]});
              }
            })
          })
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

        db.collection('newSuTestIDService')
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

          db.collection('newSuTestIDService')
          .findOne({userID: varUserID}, function(err, doc) {
            res.json({newTest1: doc.newTest[0],
                      newTest2: doc.newTest[1]});
          })
        }
      } // if (varDoc.testID !== varTestID)
   }



   function generateNewSuTestID(err, doc) {
     if (err) throw err;
     if (doc === null) {

       console.log('at server: generateSuNewTest: doc === null: insertNewSuTestID');
       console.log(userID);
       console.log(testID);
       console.log(runningNumber);

       insertNewTest(userID, testID, runningNumber);

     }
     if (doc !== null) {

       console.log('at server: generateSuNewTest: doc !== null: insertNewSuTestID');
       console.log(doc);
       console.log(userID);
       console.log(testID);
       console.log(runningNumber);

       // 1st find the current situation of the newSuTestIDService

       updateNewTest(doc, userID, testID, runningNumber);
     }
   }

   function generateTestID(err, setting) {
     if (err) throw err;
     if (setting) {
          console.log(setting);
          userID = req.params.userID;
          testID = setting.userLevel+'-'+
                    setting.userPreferTest+'-'+
                    setting.userPreferSubject;

          runningNumber = 0;

          // find the userID in the newSuTestIDService DB
          db.collection('newSuTestIDService')
          .findOne({userID: req.params.userID}, generateNewSuTestID);

   }
 }

   /** this is the main entry */
   if (req.mepSuAccess !== true) {
     res.json({errorMessage: 'no authority'});
   }

   if (req.mepSuAccess === true) {
     // 1. check setting
     db.collection('userSetting').findOne({userID: req.params.userID,
                                           userRole: 'su'}, generateTestID);

    }
  }
