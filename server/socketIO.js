
/** socketIO.js will be used for real time user log in */

module.exports = function socketIO(socket) {

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

    /** default user visit and leave MEP counting for admin dashboard */

    function countUser_cb(err, count) {

      if (err) throw err;

      console.log('at countUser_cb');

      console.log('default: '+count);
      socket.broadcast.emit('defaultVisit', count);
    }

    function defaultVisit_cb(err, doc) {

      if (err) throw err;

      if (doc) {
        db.collection('realTimeUser')
        .find({'userRole': 'default',
               'status': 'live'}).count(countUser_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'su',
               'status': 'live'}).count(countSu_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'ad',
               'status': 'live'}).count(countAd_cb);

      }
    }

    /** ------------------------------------------ */
    /** Main entry -- use DB to keep realtime data */
    /** ------------------------------------------ */
    console.log(socket.id+' connect...');
    db.collection('realTimeUser')
    .insert({'socketID': socket.id,
             'userRole': 'default',
             'accessTime': Date.now(),
             'status': 'live'}, defaultVisit_cb);
    /** ------------------------------------------ */

    function countAd_cb(err, count) {
      if (err) throw err;

      console.log('admin: '+count);

      //setTimeout(function() {socket.broadcast.emit('adVisit', count);}, 3000);

      //socket.broadcast.emit('adVisit', count);
      socket.emit('adVisit', count);
    }

    /** admin connection */
    function adConnect_cb(err, doc) {

      if (err) throw err;

      if (doc) {

        console.log(doc);

        db.collection('realTimeUser')
        .find({'userRole': 'default',
               'status': 'live'}).count(countUser_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'su',
               'status': 'live'}).count(countSu_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'ad',
               'status': 'live'}).count(countAd_cb);

      }
    }

    socket.on('adConnect', function(data) {

      console.log('ad: '+ data.socketID + ' connected to the server.');
      console.log(data.socketID);
      console.log(data);

      db.collection('realTimeUser')
      .findAndModify({'socketID': data.socketID},
                     [],
                     {$set:{'userID': data.userID,
                            'userRole': data.userRole,
                            'method': data.method,
                            'adAccessTime': Date.now()}},
                     {new: true}, adConnect_cb);
    })

    /** su connection */

    function countSu_cb(err, count) {

      if (err) throw err;

      console.log('su: '+count);
      socket.broadcast.emit('suVisit', count);
    }

    function suConnectFB_cb(err, doc) {

      if (err) throw err;

      if (doc) {

        console.log(doc);

        db.collection('realTimeUser')
        .find({'userRole': 'su',
               'status': 'live'}).count(countSu_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'default',
               'status': 'live'}).count(countUser_cb);

      }
    }

    function suConnectEmail_cb(err, doc) {

      if (err) throw err;

      if (doc) {

        console.log(doc);

        db.collection('realTimeUser')
        .find({'userRole': 'su',
               'status': 'live'}).count(countSu_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'default',
               'status': 'live'}).count(countUser_cb);

      }
    }

    socket.on('suConnect', function(data) {

      console.log('su: '+ data.socketID + ' connected to the server.');
      console.log(data.socketID);
      console.log(data);

      if (data.method === 'email') {

        db.collection('realTimeUser')
        .findAndModify({'socketID': data.socketID},
                       [],
                       {$set:{'userID' : data.userID,
                              'userRole': data.userRole,
                              'method': data.method,
                              'suAccessTime': Date.now()}},
                       {new: true}, suConnectEmail_cb);
      }
      else if (data.method === 'fb') {

        db.collection('realTimeUser')
        .findAndModify({'socketID': data.socketID},
                       [],
                       {$set:{'userID' : data.userID,
                              'userRole': data.userRole,
                              'method': data.method,
                              'suAccessTime': Date.now()}},
                       {new: true}, suConnectFB_cb);
      }
    })

   /** discinnect from MEP */
    function disconnect_cb(err, doc) {

      if (err) throw err;

      if (doc) {

        console.log(doc);

        db.collection('realTimeUser')
        .find({'userRole': 'default',
               'status': 'live'}).count(countUser_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'su',
               'status': 'live'}).count(countSu_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'ad',
               'status': 'live'}).count(countAd_cb);

      }
    }

    socket.on('disconnect', function(){

      console.log(socket.id + ' disconnect ...');

      db.collection('realTimeUser')
      .findAndModify({'socketID': socket.id},
                     [],
                     {$set:{'status': 'off',
                            'LeaveTime': Date.now()}},
                     {new: true}, disconnect_cb);

    });

    function refreshSocket_cb(err, doc) {

      if (err) throw err;

      if (doc) {

        console.log('at refreshSocket_cb');
        console.log(doc);

        db.collection('realTimeUser')
        .find({'userRole': 'default',
               'status': 'live'}).count(countUser_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'su',
               'status': 'live'}).count(countSu_cb);

        db.collection('realTimeUser')
        .find({'userRole': 'ad',
               'status': 'live'}).count(countAd_cb);
      }
    }

    socket.on('refreshSocket', function(data) {

      console.log('at server: refreshSocket');
      console.log(data);

      /** set off status to previousSocket */
      db.collection('realTimeUser')
      .findAndModify({'socketID': data.previousSocket},
                     [],
                     {$set:{'status': 'off'}},
                     {new: true}, refreshSocket_cb);

      db.collection('realTimeUser')
      .findAndModify({'socketID': data.newSocket},
                     [],
                     {$set:{'userID': data.userID,
                            'userRole': data.userRole,
                            'previousSocketID': data.previousSocket,
                            'refreshAt': data.refreshAt}},
                     {new: true}, refreshSocket_cb);
    })

/*
    socket.on('refreshCheck', function(data) {

      console.log('at refreshCheck');

      if (data === 'adDashboard') {
        console.log(data);
        refreshSocket_cb(null, 'adDashboard');
      }
    })
    */

   /** su note */
   socket.on('suNote', function(data) {

     console.log(data);

     if (data.title === '') { data.title = 'untitled';}

     // to save new note into the DB here
     if (data.title || data.note) {

       db.collection('suNote').update({'userID': data.userID,
                                       'noteTimeStart': data.noteTimeStart},
                                      {$set:{'userID': data.userID,
                                             'noteTimeStart': data.noteTimeStart,
                                             'noteTime': data.noteTime,
                                             'title': data.title,
                                             'note': data.note}},
                                      { upsert: true}, function(err, record) {
                                        if (err) throw err;
                                        //console.log(record);
                                      })
                                    }
                                  })

   socket.on('editSuNote', function(data) {

      if (data.title === '') { data.title = 'untitled';}

      if (data.title || data.note) {

        console.log(data);

        db.collection('suNote').update({'userID': data.userID,
                                        'noteTimeStart': data.noteTimeStart},
                                      //  'noteTime': data.previousNoteTime},
                                        {$set:{'noteTime': data.noteTime,
                                               'title': data.title,
                                               'note': data.note}},
                                              { upsert: true}, function(err, record) {
                                                if (err) throw err;
                                                //console.log(record);
                                              })
                                            }
                                          })

    socket.on('createSuNote', function(data) {

      console.log(data);

      if (data.title === '') { data.title = 'untitled';}

      // to save new note into the DB here
      if (data.title || data.note) {

        db.collection('suNote').update({'userID': data.userID,
                                        'noteTimeStart': data.noteTimeStart},
                                       {$set:{'userID': data.userID,
                                              'noteTimeStart': data.noteTimeStart,
                                              'noteTime': data.noteTime,
                                              'title': data.title,
                                              'note': data.note}},
                                       { upsert: true}, function(err, record) {
                                         if (err) throw err;
                                         //console.log(record);
                                       })
                                     }
                                   })


}
