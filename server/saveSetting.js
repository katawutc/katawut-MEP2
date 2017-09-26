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

    var newTestName01 = req.body.userLevel+'-'+req.body.userPreferTest+'-'+
                        req.body.userPreferSubject+'-01';

    var newTestName02 = req.body.userLevel+'-'+req.body.userPreferTest+'-'+
                        req.body.userPreferSubject+'-02';

    var suTestContentID = req.body.userLevel+'-'+req.body.userPreferTest+'-'+
                          req.body.userPreferSubject;

    // aggregate->match testID->sample
    db.collection('suTestContent').aggregate([{$match:{testID:suTestContentID}},
      {$sample:{size:3}}]).toArray(function(err, doc){

        console.log(doc);

        // to put this doc into the su new test DB <insert>
        db.collection('suNewTest').insert({userID:req.params.userID,
                                            testID: newTestName01,
                                            test: doc}, function(err, doc){
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
