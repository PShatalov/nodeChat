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

servIo.sockets.on('connection', function(clinet){
    //console.log('connected');
});
