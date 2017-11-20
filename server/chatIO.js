
module.exports = function chatIO(socket) {

  console.log('chatIO socket starts on server ...');

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();


  function suChatSocket_cb(err, doc) {

    if (err) throw err;

    if (doc) {

      console.log(doc);
    }
  }

  /** ------------------------------------------ */
  /** Main entry -- use DB to keep chat socket data */
  /** ------------------------------------------ */
  console.log(socket.id+' chat socket connect...');
  db.collection('suChatSocket')
  .insert({'chatSocketID': socket.id,
           'status': 'live'},
            suChatSocket_cb);
  /** ------------------------------------------ */


  function liveSu_cb(err, doc) {

    if (err) throw err;

    console.log(doc);

    socket.to('adminRoom').emit('liveSu', doc);
  }

  function chatConnect_cb(err, doc) {

    if (err) throw err;

      console.log(doc)

      db.collection('suChatSocket')
      .find({'userRole': 'su',
             'status': 'live'}).toArray(liveSu_cb);
  }

  socket.on('chatConnect', function(data) {

    // make admin room for admin socket to join
    if (data.userRole === 'ad') {

      socket.join('adminRoom');
    }

    // to record chat socket ID
     db.collection('suChatSocket')
     .findAndModify({'chatSocketID': data.chatSocketID},
                    [],
                    {$set:{'userID': data.userID,
                           'userName': data.userName,
                           'userRole': data.userRole,
                           'chatConnectAt': Date.now(),
                           'status': 'live'}},
                    {new: true}, chatConnect_cb);
  })


  function offSu_cb(err, doc) {

    if (err) throw err;

    console.log(doc);
    socket.to('adminRoom').emit('offSu', doc);
  }

  function chatDisconnect_cb(err, doc) {

    if (err) throw err;

    console.log(doc);

    db.collection('suChatSocket')
    .find({'userRole': 'su',
           'status': 'live'}).toArray(offSu_cb);
  }

  socket.on('disconnect', function(){

    console.log(socket.id + ' disconnect ...');

    db.collection('suChatSocket')
    .findAndModify({'chatSocketID': socket.id},
                   [],
                   {$set:{'status': 'off',
                          'LeaveTime': Date.now()}},
                   {new: true}, chatDisconnect_cb);

  });



  function refreshChatSocket_cb(err, doc) {

    if (err) throw err;

    console.log('at refreshChatSocket_cb');
    console.log(doc);

    db.collection('suChatSocket')
    .find({'userRole': 'su',
           'status': 'live'}).toArray(liveSu_cb);

  }

  socket.on('refreshChatSocket', function(data) {

    console.log('at server: refreshChatSocket');
    console.log(data);

    /** set off status to previousSocket */
    db.collection('suChatSocket')
    .findAndModify({'chatSocketID': data.previousChatSocket},
                   [],
                   {$set:{'status': 'off'}},
                   {new: true});

    db.collection('suChatSocket')
    .findAndModify({'chatSocketID': data.newChatSocket},
                   [],
                   {$set:{'userID': data.userID,
                          'userName': data.userName,
                          'userRole': data.userRole,
                          'previousChatSocketID': data.previousChatSocket,
                          'refreshAt': data.refreshAt}},
                   {new: true}, refreshChatSocket_cb);
  })

  /** **/

  socket.on('chat', function(data) {

    /** the data received should have logic to differentiate \
      * the admin and su to emit the su ID event
      */

    /** admin chat to the user first */
    if (data.userRole === 'ad' && data.adminChatTo) { //adminChatTo is userID admin chats to

        console.log('at adminChatTo block');
        console.log(data.adminChatTo);
        console.log(socket.id);
        data.adminSocketID = socket.id;
        console.log(data);

        socket.broadcast.emit(data.adminChatTo, data);
    }
    else if (data.userRole === 'su' && data.adminSocketID) {

        console.log(typeof data.userID);
        console.log(data.userID);

        console.log(typeof data.adminSocketID);
        console.log(data.adminSocketID);

        socket.to(data.adminSocketID).emit('toAdmin', 'su: '+ data.message);

    }

    /** su chat to the admin first */
    if (data.userRole === 'su' && !data.adminSocketID) {

      console.log('su chat to the admin first');

      data.suSocketID = socket.id;
      console.log(data.suSocketID);

      console.log(data);

      socket.broadcast.emit('fromSu', data);
    }
    else if (data.userRole === 'ad' && data.suSocketID) {

      console.log(data);
      socket.to(data.suSocketID).emit('fromAdmin', 'admin: '+data.message);
    }



  })

}
