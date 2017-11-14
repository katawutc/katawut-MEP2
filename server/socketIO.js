
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
