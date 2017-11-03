
module.exports = function chatIO(socket) {

  console.log('chatIO socket starts on server ...');


  socket.on('chat', function(data) {

    /** the data received should have logic to differentiate \
      * the admin and su to emit the su ID event
      */

    console.log(data);

    if (data.adminChatTo) {

        console.log(data.adminChatTo);

        socket.broadcast.emit(data.adminChatTo, 'Admin: '+ data.message);
    }
    else if (data.userRole === 'su') {
        socket.broadcast.emit(data.userID, 'su: '+ data.message);

    }

    if (data.userRole === 'su') {
      socket.broadcast.emit(data.userID, 'su: '+ data.message);
      //socket.broadcast.emit(data.userID, 'su: '+ data.message);
    }
    else if (data.userRole === 'ad') {
      socket.broadcast.emit(data.userID, 'Admin: '+ data.message);
      //socket.broadcast.emit(data.userID, 'Admin: '+ data.message);
    }
  })


}
