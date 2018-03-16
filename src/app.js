require('dotenv').config()
const dataActions = require('./actions/dataActions');
const models = require("./models/node");
const helmet = require('helmet');

const app = require('express')();
app.use(helmet());


// let ssl = {
//     key: fs.readFileSync('./ssl/server.key'),
//     cert: fs.readFileSync('./ssl/server.crt'),
//     ca: fs.readFileSync('./ssl/ca.crt'),
//     requestCert: true,
//     rejectUnauthorized: false
// }

let ssl = {};

const http = require('http').Server(app);
const io = require('socket.io')(http);

//connect to the DB & start the server
models
    .sequelize
    .sync()
    .then(function () {

        http.listen(process.env.LISTEN_PORT, function () {
            console.log('app started, listening on *:' + process.env.LISTEN_PORT);
        });

    });

//setup socket rules
io.on('connection', function (socket) {
    console.log("Socket connected: " + socket.id);

    socket.on('action', (action) => {
        console.log('action', action);
        dataActions(socket, action);
    });

});