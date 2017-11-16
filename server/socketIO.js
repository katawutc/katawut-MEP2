
/** socketIO.js will be used for real time user log in */

module.exports = function socketIO(socket) {

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

    /** default user visit and leave MEP counting for admin dashboard */

    function countDefaultUser_cb(err, count) {

      if (err) throw err;
      if (count) {

        console.log(count);

        socket.broadcast.emit('defaultUserVisit', count);
      }
    }

    function defaultVisit_cb(err, doc) {

      if (err) throw err;

      if (doc) {
        db.collection('realTimeUser')
        .find({'user': 'default',
               'status': 'live'}).count(countDefaultUser_cb);
      }
    }

    /** use DB to keep realtime data */
    console.log(socket.id+' connect...');
    db.collection('realTimeUser')
    .insert({'socketID': socket.id,
             'user': 'default',
             'accessTime': Date.now(),
             'status': 'live'}, defaultVisit_cb);



    function defaultUserLeave_cb(err, count, status) {

      if (err) throw err;

      db.collection('realTimeUser')
      .find({'status': 'live'}).count(countDefaultUser_cb);

    }

    socket.on('disconnect', function(){

      /*
      console.log(socket.id);
      socket.broadcast.emit('defaultUserLeave', socket.id);
      console.log('A user disconnects the MEP ...');*/
      console.log(socket.id+' disconnect...');
      db.collection('realTimeUser')
      .update({'socketID': socket.id},
              {$set: {'offTime': Date.now(),
                      'status': 'off'
                    }}, defaultUserLeave_cb);

    });

    /** admin connection */

    function adminVisit_cb(err, doc) {

      db.collection('realTimeUser')
      .find({'user': 'default',
             'status': 'live'}).count(countDefaultUser_cb);
    }

    socket.on('adConnect', function(data) {

      console.log('ad: '+ data.userID + ' connected to the server.');
      console.log(data.socketID);
      console.log(data);

      /*
      db.collection('realTimeUser')
      .insert({'socketID': socket.id,
               'user': 'ad',
               'userID': userID,
               'accessTime': Date.now(),
               'status': 'live'}, adminVisit_cb);
               */
    })





    /*

    socket.on('suConnect', function(userID) {
      console.log('su: '+ userID + ' connected to the server.');
    })

    */

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
