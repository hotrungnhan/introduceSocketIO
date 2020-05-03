
module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('join', async (data) => {
            let rooms = Object.keys(socket.rooms);
            console.log(rooms);
            await socket.leave(rooms)
            await socket.join(data.room, () => {
                io.in(data.room).emit('join', { msg: `${data.name} has join ${data.room}` })
            });
            console.log(room);
        })
        io.in(socket.rooms).emit('newMessage', { msg: `${socket.id} has join ${socket.room}` })
        socket.on('close', (data) => {
            io.in(data.room).emit('join', { msg: `${data.name} has leave ` })
        });
        socket.on('newMessage', (data) => {
            io.in(data.room).emit('newMessage', data);
            console.log(data);
        });
        socket.on('typing', (data) => {
            socket.broadcast.to(data.room).emit('typing', data);
        })
    });
    // setInterval(function () {
    //     console.clear()
    //     console.log(io.sockets.adapter.rooms)
    // }, 1000);
}