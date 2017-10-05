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
            // create testID here
            // check testID in suNewTestService DB
            // - check userID for current testID,
            // - {userID: suerID,
            //    testID: xxxxxx,
            //     newTest1: {suTestNumber: xx,
            //                status: xx},
            //     newTest2: {suTestNumber: xx'
            //                status: xx}
            //   }
            // - if match, do nothing
            // - if do not replace
            // check suTestID number
            // generate suTestID
          }
       }
    }




  res.json('su new test is generated from server');


}
