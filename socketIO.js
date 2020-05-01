module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('roomchose', (data) => {
            socket.join(data.room, () => {
                let rooms = Object.keys(socket.rooms);
                console.log(rooms); // [ <socket.id>, 'room 237' ]
                io.in(data.room).emit('message', { msg: `${data.name} have join ${data.room}` })
            });
        })
        // io.in(socket.rooms).emit('message', { msg: `${socket.id} have join ${socket.room}` })
        socket.on('disconnect', (data) => {
            io.in(data.room).emit('message', { msg: 'SomeOne Disconnected' })
        });
        socket.on('message', (data) => {
            io.in(data.rooms).emit('message', data);
            console.log(data);
        });
        socket.on('typing', (data) => {
            socket.broadcast.to(data.room).emit('typing', data);
        })
    });
}