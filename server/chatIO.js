
module.exports = function chatIO(socket) {

  console.log('chatIO socket starts on server ...');


  socket.on('chat', function(data) {

    /** the data received should have logic to differentiate \
      * the admin and su to emit the su ID event
      */

    //console.log(data);

    if (data.adminChatTo) { //adminChatTo is userID admin chats to

        console.log('at adminChatTo block');
        console.log(data.adminChatTo);
        console.log(socket.id);
        data.adminSocketID = socket.id;
        console.log(data);

        socket.broadcast.emit(data.adminChatTo, data);
    }
    else if (data.userRole === 'su') {

        console.log(typeof data.userID);
        console.log(data.userID);

        console.log(typeof data.adminSocketID);
        console.log(data.adminSocketID);

        socket.to(data.adminSocketID).emit('toAdmin', 'su: '+ data.message);

        //socket.broadcast.emit(data.userID, 'su: '+ data.message);
    }
  })

}
