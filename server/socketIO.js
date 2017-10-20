
module.exports = function socketIO(socket) {

    console.log('Connected succesfully to the socket ...');
    socket.on('disconnect', function(){
      console.log('a user disconnected');
    });

    socket.on('suConnect', function(userID) {
      console.log('su: '+ userID + ' connected to the server.');

      socket.emit('greetingSu', {'message': 'Hello su user!'});
    })

    socket.on('adConnect', function(userID) {
      console.log('ad: '+ userID + ' connected to the server.');
    })

    socket.on('chat', function(data) {

      console.log(data.message);

      socket.broadcast.emit('chatRoom', data.message);
    })
}
