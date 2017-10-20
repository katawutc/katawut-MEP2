module.exports = function generateNewSuTestID(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var userID;
  var testID;
  var runningNumber;

  var updateTestID;
  var updateRunningNumber;

  var currentSuTestIDService;

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


   function newSuTestIDHistory_cb(err, count, status) {

      if (err) throw err;

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

   function checkSuTestIDHistory_cb(err, suTestIDDoc) {
     if (err) throw err;


     if (suTestIDDoc===null) {

       // insert new setting //
       // need to check to insert new or old setting

       var suTest = [{'testID': testID,
                      'suTestID': testID+'-'+(runningNumber+1),
                      'suTestNumber': runningNumber+1,
                      'status': 'new'},
                      {'testID': testID,
                      'suTestID': testID+'-'+(runningNumber+2),
                      'suTestNumber': runningNumber+2,
                      'status': 'new'}];


      /** 1. to record the current suTestID setting into suTestIDHistory
        * 2. can be many testID history; but unique in userID and testID
        */
       db.collection('suTestIDHistory')
       .insert({'userID': userID,
                'testID': testID,
                'runningNumber': runningNumber+2,
                'newTest': suTest}, newSuTestIDHistory_cb);
      }
      else if (suTestIDDoc) { // found doc in the suTestIDHistory

       if (suTestIDDoc.newTest.length === 2) {

         // to update newSuTestIDService with suTestIDDoc
         db.collection('newSuTestIDService')
         .update({'userID': suTestIDDoc.userID},
                 {$set: {'testID': suTestIDDoc.testID,
                         'runningNumber': suTestIDDoc.runningNumber,
                          'newTest': suTestIDDoc.newTest}},
                 {upsert: true }, returnExistingSuTestID_cb);
        }

        // may not need this block; it may already be updated
       if (suTestIDDoc.newTest.length === 1) {

         var newTest = {'testID': suTestIDDoc.testID,
                        'suTestID': suTestIDDoc.testID+'-'+(suTestIDDoc.runningNumber+1),
                        'suTestNumber': suTestIDDoc.runningNumber+1,
                        'status': 'new'}

         db.collection('suTestIDHistory')
         .update({'userID': userID,
                  'testID': suTestIDDoc.testID},
                 {$set: {'runningNumber': suTestIDDoc.runningNumber+1},
                  $push: {'newTest': newTest}},
                  {upsert: true },
          function(err, count, status){
            if (err) throw err;

            db.collection('suTestIDHistory')
            .findOne({'userID': userID,
                     'testID': suTestIDDoc.testID},
            function(err, doc){

              if (err) throw err;

              if (doc) {

              db.collection('newSuTestIDService')
              .update({'userID': suTestIDDoc.userID},
                      {$set: {'testID': suTestIDDoc.testID,
                              'runningNumber': suTestIDDoc.runningNumber+1,
                              'newTest': doc.newTest}}, returnExistingSuTestID_cb);
              }
            })
          })
        }
      }
    }

   function updateNewTest(existingTestIDDoc, // current testID
                           userID,
                           newTestID, // new testID
                           varRunningNumber) {

     updateTestID = newTestID;
     updateRunningNumber = varRunningNumber;

     /** there will be 2 new tests presented at one time */
     if (existingTestIDDoc.testID === newTestID && existingTestIDDoc.newTest.length === 2) {

         res.json({newTest1: existingTestIDDoc.newTest[0],
                   newTest2: existingTestIDDoc.newTest[1]});
     }

     if (existingTestIDDoc.testID === newTestID && existingTestIDDoc.newTest.length === 1) {
         // set new runningNumber + 1
         // push new test into the array
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
                  {upsert: true},
          function(err, count, status) {
            if (err) throw err;

            db.collection('suTestIDHistory')
            .update({'userID': userID,
                     'testID': newTestID},
                    {$set: {'runningNumber': newRunningNumber},
                     $push: {'newTest': {'testID': newTestID,
                                         'suTestID': newTestID+'-'+newRunningNumber,
                                         'suTestNumber': newRunningNumber,
                                         'status': 'new'}}}, returnOneNewSuTestID_cb);
          })
      }

     // implement the new setting testID here
     if (existingTestIDDoc.testID !== newTestID) {

         currentSuTestIDService = existingTestIDDoc;

         db.collection('suTestIDHistory')
         .findOne({'userID': userID,
                   'testID': newTestID}, checkSuTestIDHistory_cb);
      }
    }


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

            db.collection('suTestIDHistory')
            .insert(newSuTest, function(err, doc){

              if (err) throw err;
              if (doc) {

                var suNewTest = {newTest1: newSuTest.newTest[0],
                                  newTest2: newSuTest.newTest[1]};
                res.json(suNewTest);
              }
            })
          }
      });
    }


   function generateNewSuTestID(err, existingTestIDDoc) {
     if (err) throw err;
     if (existingTestIDDoc === null) {

       insertNewTest(userID,
                      testID, /*new one*/
                      runningNumber);

     }
     if (existingTestIDDoc !== null) {

       /** check suTestHistory here for the latest running number
         * 1. check 'suTestHistory' to get the latest running number
         */

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
