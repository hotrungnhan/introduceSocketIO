require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path')
//sever
const sever = app.listen(process.env.PORT, () => {
    console.log(`connected ${process.env.PORT}`);
})
//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', true);
//static
app.use('/', express.static('public'));
//io
const io = require('socket.io')(sever);
require('./socketIO')(io);
// route
app.get('/', (req, res) => {
    res.sendFile('index.html');
});