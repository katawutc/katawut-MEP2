module.exports = function generateNewSuTest(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();


  console.log('at server generateNewSuTest');

  console.log(req.params.testID);
  console.log(req.params.testRunningNumber);

  var suTestID = req.params.testID+'-'+req.params.testRunningNumber;

  console.log(suTestID);

  /**
   * 1. to check if suTestID is already generated ?
   * 2.
   */

   /** 1. to check if suTestID is already generated ? */
   db.collection('newSuTest')
   .findOne({userID: req.params.userID,
              suTestID: suTestID}, cb);

   function cb(err, doc) {
     if (err) throw err;
     if (doc !== null) {
       res.json({suTestID: req.params.testID+'-'+req.params.testRunningNumber,
                 suTestSize: 3});
     }
     else if (doc === null) {
       generateNewSuTest();
     }

     function generateNewSuTest() {
       // aggregate->match testID->sample
       db.collection('suTestContent')
       .aggregate([{$match:{testID:req.params.testID}},
         {$sample:{size:3}}]).toArray(function(err, doc){

           // to put this doc into the su new test DB <insert>
           // to separate testID and test number <test running number>
           // to insert number of question e.g. 3
           db.collection('newSuTest')
           .insert({userID:req.params.userID,
                     suTestID: suTestID,
                     suTestSize: 3,
                     suTest: doc}, function(err, doc){

           if (err) throw err;
           else {
             res.json({suTestID: req.params.testID+'-'+req.params.testRunningNumber,
                       suTestSize: 3});
           }
         });
       })
     }
   }
 }
  /** get the customize su test content here
    * 1. create a new test name
    * 2. aggregate test content
    * 3. put into the DB for the su
    */

    /**
     * How to implement suTestNumber
     * 1. check test history
     * 2. check
     */



     /*
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
     */