
module.exports = function chatIO(socket) {

  console.log('chatIO socket starts on server ...');


  socket.on('chat', function(data) {

    /** the data received should have logic to differentiate \
      * the admin and su to emit the su ID event
      */

    console.log(data);

    if (data.adminChatTo) { //adminChatTo is userID admin chats to

        console.log(data.adminChatTo);
        console.log('at adminChatTo block');
        socket.broadcast.emit(data.adminChatTo, 'Admin: '+ data.message);
    }
    else if (data.userRole === 'su') {
      
        socket.broadcast.emit(data.userID, 'su: '+ data.message);
    }
  })

}
