/**
 * Created by Peex on 27.06.2015.
 */
var express = require('express');
var io = require('socket.io');

var app = express();
var port = 8080;

var servIo = io.listen(app.listen(port));


app.set('views', __dirname+'/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
    res.render('page');
});

servIo.sockets.on('connection', function(client){
    //console.log('connected');

    client.on('send', function(data){
        servIo.sockets.emit('message', {message: data.message});
    });
    client.on('helloMessage', function(data){
        client.emit('message',{message: data + ', welcome to the chat'});
        client.broadcast.emit('message',{message: data + ' joined to the chat'});
    });
    client.on('disconnect', function(client){
        client.broadcast.emit('message',{message: 'somebody left the chat'});
    });
});
