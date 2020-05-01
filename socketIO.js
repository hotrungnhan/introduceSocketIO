module.exports = function (io) {
    io.on('connection', (socket) => {
        io.emit('message', { msg: 'SomeOne connected' })
        socket.on('disconnect', () => {
            io.emit('message', { msg: 'SomeOne Disconnected' })
        });
        socket.on('message', (data) => {
            io.emit('message', data);
            console.log(data);
        });
        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', data);
        })
    });
}