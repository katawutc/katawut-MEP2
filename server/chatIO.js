
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
    // make su chat socket join the userID room
    else if (data.userRole === 'su') {

      socket.join(data.userID);
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

    db.collection('suChatSocket')
    .find({'userRole': 'su',
           'status': 'live'}).toArray(liveSu_cb);

    // socket need to rejoin room after refreshing

  }

  socket.on('refreshChatSocket', function(data) {

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

    // socket need to rejoin room after refreshing
    // make admin room for admin socket to join
    if (data.userRole === 'ad') {

      socket.join('adminRoom');
    }
    // make su chat socket join the userID room
    else if (data.userRole === 'su') {

      socket.join(data.userID);
    }
  })


  function logOut_cb(err, doc) {

    if (err) throw err;

    console.log(doc);

    db.collection('suChatSocket')
    .find({'userRole': 'su',
           'status': 'live'}).toArray(liveSu_cb);
  }

  socket.on('logOut', function(data) {

    console.log('log out: '+ data);
    db.collection('suChatSocket')
    .findAndModify({'userID': data,
                    'chatSocketID': socket.id}, // userID is not enough; need to use socketID
                   [],
                   {$set:{'userRole': 'default',
                          'status': 'off',
                          'logOutAt': Date.now()}},
                   {new: true}, logOut_cb);
  })

  /** **/

  function saveSuChat_cb(err, doc) {

    if (err) throw err;

    console.log('save su chat');
    console.log(doc);
  }

  socket.on('chat', function(data) {

    /** admin chat to the user first */
    if (data.userRole === 'ad' && data.suID) {

        db.collection('suChat')
        .findAndModify({'userID': data.suID,
                        'chatStartAt': data.chatStartAt},
                        [],
                        {$push: {'message': data}},
                        {new: true, upsert: true}, /*saveSuChat_cb*/
        function(err, doc) {
          if (err) throw err;

          socket.to(data.suID).emit(data.suID, data);
      })
    }
    else if (data.userRole === 'su' && data.adID) {

      db.collection('suChat')
      .findAndModify({'userID': data.userID,
                      'chatStartAt': data.chatStartAt},
                      [],
                      {$push: {'message': data}},
                      {new: true, upsert: true}, /*saveSuChat_cb*/
      function(err, doc) {

        if (err) throw err;

        socket.to('adminRoom').emit(data.adID, data);

      })
    }

    /** su chat to the admin first */
    if (data.userRole === 'su' && !data.adID) {

      // save chat 1st before emitting event
      db.collection('suChat')
      .findAndModify({'userID': data.userID,
                      'chatStartAt': data.chatStartAt},
                      [],
                      {$push: {'message': data}},
                      {new: true, upsert: true}, /*saveSuChat_cb*/
      function(err, doc) {
        if (err) throw err;

        // emit to admin room
        socket.to('adminRoom').emit('toAllAdmin', data);

      });

    }
  })

  socket.on('suMessageReceive', function(data) {

    if (data.sentSuccess === true) {

      db.collection('suChat')
      .findAndModify({'userID': data.userID,
                      'chatStartAt': data.chatStartAt,
                      'message':{$elemMatch:{'userRole': 'su',
                                             'sentTime': data.sentTime}}},
                      [],
                      {$set: {'message.$.sentSuccess': true}},
                      {new: true}, saveSuChat_cb);
    }
  })

  socket.on('adMessageReceive', function(data) {

    if (data.sentSuccess === true) {

      db.collection('suChat')
      .findAndModify({'userID': data.suID,
                      'chatStartAt': data.chatStartAt,
                      'message':{$elemMatch:{'userRole': 'ad',
                                             'sentTime': data.sentTime}}},
                      [],
                      {$set: {'message.$.sentSuccess': true}},
                      {new: true}, saveSuChat_cb);

    }
  })

}
