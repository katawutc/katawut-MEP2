module.exports = function generateSuNewTest(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log('at server: generateSuNewTest');

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

            db.collection('suNewTestService')
            .findOne({userID: req.params.userID}, cb);

        function cb(err, doc) {
          if (err) throw err;
          if (!doc) {
            var newTest = insertNewTest(db, userID, testID, runningNumber);
            res.json(newTest);
          }
          else if (doc) {
            var newTest = updateNewTest();
            res.json(newTest);
          }
        }
      }
    }
  }
}

function insertNewTest(varDB, varUserID, varTestID, varRunningNumber) {

  var newTest = {userID: varUserID,
                  testID: varTestID,
                  runningNumber: varRunningNumber+2,
                  newTest1: {suTestID: varTestID+'-'+(varRunningNumber+1),
                              suTestNumber: varRunningNumber+1,
                              status: 'new'},
                  newTest2: {suTestID: varTestID+'-'+(varRunningNumber+2),
                              suTestNumber: varRunningNumber+2,
                              status: 'new'}
                }

  varDB.collection('suNewTestService')
  .insert(newTest, function(err, doc){
      if (err) throw err;
      if (doc) {
        return ({newTest1: newTest.newTest1,
                newTest2: newTest.newTest2});
      }
  });
}

function updateNewTest() {
  console.log('at server: generateSuNewTest: updateNewTest');
    return ('su new test is generated from server');
}



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
