
module.exports = function socketIO(socket) {

    console.log('A user visits the MEP ...');

    socket.on('disconnect', function(){
      console.log('A user disconnects the MEP ...');
    });

    socket.on('suConnect', function(userID) {
      console.log('su: '+ userID + ' connected to the server.');
    })

    //socket.on('suConnect', require('./socketIO/suConnect'));

    socket.on('adConnect', function(userID) {
      console.log('ad: '+ userID + ' connected to the server.');
    })

    socket.on('chat', function(data) {

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
}
