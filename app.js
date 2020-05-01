let port = 3000;
var express = require('express')
var app = express();
var path = require('path');
//sever
var sever = app.listen(port, () => {
    console.log(`connected ${port}`);
})
//static
app.use('/', express.static('public'));
//io
var io = require('socket.io')(sever);
require('./socketIO')(io);
// route
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
