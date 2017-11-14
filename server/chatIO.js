
module.exports = function chatIO(socket) {

  console.log('chatIO socket starts on server ...');


  socket.on('chat', function(data) {

    /** the data received should have logic to differentiate \
      * the admin and su to emit the su ID event
      */

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
