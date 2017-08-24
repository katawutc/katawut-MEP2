var mongoClient = require('mongodb');

// user: katawutc
var mlabDB = 'mongodb://katawut:AccessMongo@ds129023.mlab.com:29023/mep';
var db;

module.exports = {
  connectMongoDB: function(cb) {
    mongoClient.connect(mlabDB, function(err, database){
      if (err) console.log('Error, cannot connect to MongoDB');
      else {
        console.log('MongoDB MLab connected ...');
      }
      db = database;
      cb();
    });
  },
  getDB: function() {
    return db;
  }
}
