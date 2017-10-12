module.exports = function generateNewSuTestID(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var userID;
  var testID;
  var runningNumber;

  var updateTestID;
  var updateRunningNumber;

  var currentSuTestIDService;


   function insertNewTest(varUserID, varTestID, varRunningNumber) {

     var newSuTest = {'userID': varUserID,
                      'testID': varTestID,
                      'runningNumber': varRunningNumber+2,
                      'newTest': [{'testID': varTestID,
                                   'suTestID': varTestID+'-'+(varRunningNumber+1),
                                   'suTestNumber': varRunningNumber+1,
                                   'status': 'new'},
                                  {'testID': varTestID,
                                   'suTestID': varTestID+'-'+(varRunningNumber+2),
                                   'suTestNumber': varRunningNumber+2,
                                   'status': 'new'}]};

     db.collection('newSuTestIDService')
     .insert(newSuTest, function(err, doc){
         if (err) throw err;
         if (doc) {
           var suNewTest = {newTest1: newSuTest.newTest[0],
                             newTest2: newSuTest.newTest[1]};
           res.json(suNewTest);
         }
     });
   }


   function returnOneNewSuTestID_cb(err, count, doc) {
     if (err) throw err;

     db.collection('newSuTestIDService')
     .findOne({'userID': userID,
               'testID': testID},
     function(err, doc) {
       if (err) throw err;
       if (doc) {
         res.json({newTest1: doc.newTest[0],
                   newTest2: doc.newTest[1]});
       }
     })
   }

   function returnNewSuTestID_cb(err, count, doc) {
     if (err) throw err;

     db.collection('newSuTestIDService')
     .findOne({'userID': userID}, function(err, doc) {
       res.json({newTest1: doc.newTest[0],
                 newTest2: doc.newTest[1]});
     })
   }

   function returnExistingSuTestID_cb(err, count, doc) {
     if (err) throw err;

     db.collection('newSuTestIDService')
     .findOne({'userID': userID}, function(err, doc) {
       res.json({newTest1: doc.newTest[0],
                 newTest2: doc.newTest[1]});
     })
   }


   function newSuTestIDHistory_cb(err, previousSuTestIDInserted) {

      if (err) throw err;

      console.log('at server: newSuTestIDHistory_cb');

      if (previousSuTestIDInserted) {

        console.log(previousSuTestIDInserted);

        var newSuTest = [{'testID': testID,
                          'suTestID': testID+'-'+(runningNumber+1),
                          'suTestNumber': runningNumber+1,
                          'status': 'new'},
                         {'testID': testID,
                          'suTestID': testID+'-'+(runningNumber+2),
                          'suTestNumber': runningNumber+2,
                          'status': 'new'}];

        db.collection('newSuTestIDService') // update
        .update({'userID': userID},
                {$set: {'testID': testID,
                        'runningNumber': runningNumber+2,
                        'newTest': newSuTest}},
         function(err, count, doc){
           if (err) throw err;

           res.json({newTest1: newSuTest[0],
                     newTest2: newSuTest[1]});
           })
      }
    }

   function checkSuTestIDHistory_cb(err, suTestIDDoc) {
     if (err) throw err;
     if (suTestIDDoc) {

       console.log('at checkSuTestIDHistory_cb: found suTestIDDoc');
       // to update newSuTestIDService with suTestIDDoc
       db.collection('newSuTestIDService')
       .update({'userID': suTestIDDoc.userID},
               {$set: {'testID': suTestIDDoc.testID,
                       'runningNumber': suTestIDDoc.runningNumber,
                       'newTest': suTestIDDoc.newTest}},
               {upsert: true }, returnExistingSuTestID_cb);
      }

       /*
       "userID": "59a79fe2c24fc4b4b70995f5",
"testID": "P6-O-net-Math",
"runningNumber": 5,
"newTest": [
 {
     "testID": "P6-O-net-Math",
     "suTestID": "P6-O-net-Math-4",
     "suTestNumber": 4,
     "status": "new"
 },
 {
     "testID": "P6-O-net-Math",
     "suTestID": "P6-O-net-Math-5",
     "suTestNumber": 5,
     "status": "new"
 }
]

       */

     if (suTestIDDoc===null) {

       console.log('at checkSuTestIDHistory_cb: suTestIDDoc===null');

       /**
        * 1. to record the current suTestID setting into suTestIDHistory
        * 2. change newSuTestIDService to the new suTestID setting
        */

       console.log(currentSuTestIDService);

       var suTest = [{'testID': currentSuTestIDService.testID,
                      'suTestID': currentSuTestIDService.newTest[0].suTestID,
                      'suTestNumber': currentSuTestIDService.newTest[0].suTestNumber,
                      'status': currentSuTestIDService.newTest[0].status},
                      {'testID': currentSuTestIDService.testID,
                      'suTestID': currentSuTestIDService.newTest[1].suTestID,
                      'suTestNumber': currentSuTestIDService.newTest[1].suTestNumber,
                      'status': currentSuTestIDService.newTest[1].status}];

      /** 1. to record the current suTestID setting into suTestIDHistory */
       db.collection('suTestIDHistory')
       .update({'userID': currentSuTestIDService.userID,
                'testID': currentSuTestIDService.testID,
                'runningNumber': currentSuTestIDService.runningNumber,
                'newTest': suTest},
                {upsert: true}, newSuTestIDHistory_cb);
      }
   }

   function updateNewTest(existingTestIDDoc, // current testID
                           userID,
                           newTestID, // new testID
                           varRunningNumber) {

     updateTestID = newTestID;
     updateRunningNumber = varRunningNumber;

     console.log('at server: updateNewTest');

     /** there will be 2 new tests presented at one time */
     if (existingTestIDDoc.testID === newTestID && existingTestIDDoc.newTest.length === 2) {


        console.log('at existingTestIDDoc.testID === newTestID && existingTestIDDoc.newTest.length === 2');

         res.json({newTest1: existingTestIDDoc.newTest[0],
                   newTest2: existingTestIDDoc.newTest[1]});
     }

     if (existingTestIDDoc.testID === newTestID && existingTestIDDoc.newTest.length === 1) {
         // set new runningNumber + 1
         // push new test into the array

         console.log('at server: existingTestIDDoc.testID === newTestID && existingTestIDDoc.newTest.length === 1');

         var currentRunningNumber = existingTestIDDoc.runningNumber;

         var newRunningNumber = currentRunningNumber + 1;

         db.collection('newSuTestIDService')
         .update({'userID': userID,
                  'testID': newTestID},
                 {$set: {'runningNumber': newRunningNumber},
                  $push: {'newTest': {'testID': newTestID,
                                      'suTestID': newTestID+'-'+newRunningNumber,
                                      'suTestNumber': newRunningNumber,
                                      'status': 'new'}}},
                  {upsert: true}, returnOneNewSuTestID_cb);
      }

     // implement the new setting testID here
     if (existingTestIDDoc.testID !== newTestID) {

       /**
        * 1. check if testID is existed in the suTest DB and it's current running number
        * 2. if testID not existed in the suTest DB, generate a new one
        */

        /**
         * To implement logic of changing testID and suTestID
         * 1. to have another DB collection: suTestIDHistory
         * 2. to record the latest test runningNumber
         * 3. to record the latest suTestID on dashboard
         ***
         * 4. if the new testID is in the suTestIDHistory \
         *    take the data and display
         * 5. if not create the new one
         */

         /*******/

         console.log('at existingTestIDDoc.testID !== newTestID');

         currentSuTestIDService = existingTestIDDoc;

         db.collection('suTestIDHistory')
         .findOne({'userID': userID,
                   'testID': newTestID}, checkSuTestIDHistory_cb);
      }
    }


   function generateNewSuTestID(err, existingTestIDDoc) {
     if (err) throw err;
     if (existingTestIDDoc === null) {

       insertNewTest(userID,
                      testID, /*new one*/
                      runningNumber);

     }
     if (existingTestIDDoc !== null) {

       // 1st find the current situation of the newSuTestIDService
       updateNewTest(existingTestIDDoc,// --> hold the current suTestIDService
                      userID,
                      testID, /*new one*/
                      runningNumber);
     }
   }

   function generateTestIDWithSetting(err, setting) {
     if (err) throw err;
     if (setting) {
          userID = req.params.userID;
          testID = setting.userLevel+'-'+
                    setting.userPreferTest+'-'+
                    setting.userPreferSubject;

          runningNumber = 0;

          console.log('at server: generateTestIDWithSetting');
          console.log(userID);
          console.log(testID);

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
     db.collection('userSetting')
     .findOne({userID: req.params.userID,
               userRole: 'su'}, generateTestIDWithSetting);
    }
  }
