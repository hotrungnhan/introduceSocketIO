const pool = require('./services/pool')
const mess = require('./services/message')
module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('roomchose', async (data) => {
            let rooms = Object.keys(socket.rooms);
            console.log(rooms); // [ <socket.id>, 'room 237' ]
            await socket.leave(rooms)
            await socket.join(data.room, () => {

                io.in(data.room).emit('message', { msg: `${data.name} have join ${data.room}` })
            });
        })
        io.in(socket.rooms).emit('message', { msg: `${socket.id} have join ${socket.room}` })
        socket.on('disconnect', (data) => {
            io.in(data.room).emit('message', { msg: 'SomeOne Disconnected' })
        });
        socket.on('message', (data) => {
            io.in(data.room).emit('message', data);
            console.log(data);
        });
        socket.on('typing', (data) => {
            socket.broadcast.to(data.room).emit('typing', data);
        })
    });
    setInterval(function () {
        console.clear()
        console.log(io.sockets.adapter.rooms)
    },1000);
}