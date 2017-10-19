
module.exports = function socketIO(socket) {

    console.log('Connected succesfully to the socket ...');
    socket.on('disconnect', function(){
      console.log('a user disconnected');
    });

    socket.on('suConnect', function(userID) {
      console.log(userID + ' connected to the server.');

      socket.emit('greetingSu', {'message': 'Hello su user!'});
    })

    socket.on('chat', function(message) {

      console.log(message);
    })
}
