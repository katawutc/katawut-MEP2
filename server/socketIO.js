
module.exports = function socketIO(socket) {

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

    console.log('A user visits the MEP ...');

    socket.on('disconnect', function(){
      console.log('A user disconnects the MEP ...');
    });

    socket.on('suConnect', function(userID) {
      console.log('su: '+ userID + ' connected to the server.');
    })

    socket.on('adConnect', function(userID) {
      console.log('ad: '+ userID + ' connected to the server.');
    })

    socket.on('chat', function(data) {

      /** the data received should have logic to differentiate \
        * the admin and su to emit the su ID event
        */

      console.log(data);

      if (data.userRole === 'su') {
        socket.broadcast.emit('chatRoom', 'su: '+ data.message);
        //socket.broadcast.emit(data.userID, 'su: '+ data.message);
      }
      else if (data.userRole === 'ad') {
        socket.broadcast.emit('chatRoom', 'Admin: '+ data.message);
        //socket.broadcast.emit(data.userID, 'Admin: '+ data.message);
      }
    })

   socket.on('suNote', function(data) {

     console.log(data);

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

      if (data.title || data.note) {

        db.collection('suNote').update({'userID': data.userID,
                                        'noteTime': data.previousNoteTime},
                                        {$set:{'noteTime': data.newNoteTime,
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
