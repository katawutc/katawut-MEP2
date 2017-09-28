var objectID = require('mongodb').ObjectID

module.exports = function saveSetting(req, res) {

  // save setting preference into the DB
  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  db.collection('userSetting').update({userID: req.params.userID,
                                                userRole: req.params.userRole},
                                                  {$set:{userLevel: req.body.userLevel,
                                                      userPreferTest: req.body.userPreferTest,
                                                      userPreferSubject: req.body.userPreferSubject}},
                                                        {upsert: true}, cb);
  function cb(err, doc) {
    if (err) throw err;

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

      var suTestNumber = 01;

      var testID = req.body.userLevel+'-'+req.body.userPreferTest+'-'+
                    req.body.userPreferSubject;

      var suNewTest01 = testID+'-'+suTestNumber;


    // aggregate->match testID->sample
    db.collection('suTestContent').aggregate([{$match:{testID:testID}},
      {$sample:{size:3}}]).toArray(function(err, doc){

        console.log(doc);

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
