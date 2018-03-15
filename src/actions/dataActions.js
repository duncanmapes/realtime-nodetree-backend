const models = require("../models/node");

const Actions = (socket,action) => {
    if(action.type === 'server/getInitialState'){
        models.findAll().then((data) => {          
            socket.broadcast.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to everyone but socket
            socket.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to socket
        });
    }
    else if(action.type === 'server/newNode'){

        models.upsert(action.data).then(() => {
            models.findAll().then((data) => {          
                socket.broadcast.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to everyone but socket
                socket.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to socket
            });
        });    
    }

    else if(action.type === 'server/saveNode'){

        models.update(action.data, {
            where: { id: action.data.id }
          }).then(() => {
            models.findAll().then((data) => {          
                socket.broadcast.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to everyone but socket
                socket.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to socket
            });
        });    
    }

    else if(action.type === 'server/deleteNode'){

        models.destroy( {
            where: { id: action.data }
          }).then(() => {
            models.findAll().then((data) => {          
                socket.broadcast.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to everyone but socket
                socket.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to socket
            });
        });    
    }

    else if(action.type === 'server/deleteAll'){

        models.destroy( {
            where: {}
          }).then(() => {
            models.findAll().then((data) => {          
                socket.broadcast.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to everyone but socket
                socket.emit('action', {type:'fullNodeUpdate',data:{nodes:data}}); //emits to socket
            });
        });    
    }
   




}



module.exports = Actions;