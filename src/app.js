

const app = require('express')();
const http = require('http').Server({
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
    ca: fs.readFileSync('./ssl/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
}, app);
const io = require('socket.io')(http);


const dataActions = require('./actions/dataActions');

const models = require("./models/node");

models.sequelize.sync().then(function () {

http.listen(process.env.LISTEN_PORT, function(){
    console.log('listening on *:5000');
  });

});



io.on('connection', function(socket){
  console.log("Socket connected: " + socket.id);

  socket.on('action', (action) => {
      console.log('action', action);
    dataActions(socket,action);
  });
  
    
});