

module.exports = function saveSetting(req, res) {

  // save setting preference into the DB
  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log(req.body.userLevel);
  console.log(req.body.userPreferTest);
  console.log(req.body.userPreferSubject);

  db.collection('userSetting').update({userID: req.params.userID,
                                                userRole: req.params.userRole},
                                                  {$set:{userLevel: req.body.userLevel,
                                                      userPreferTest: req.body.userPreferTest,
                                                      userPreferSubject: req.body.userPreferSubject}},
                                                        {upsert: true}, cb);
  function cb(err, doc) {
    if (err) throw err;
    console.log(doc);
    res.json('return from at save setting server');
  }
}
