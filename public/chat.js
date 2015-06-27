/**
 * Created by Peex on 27.06.2015.
 */
window.onload = function(){
    var socket = io.connect('http://localhost:8080');
    var field = document.getElementById('field');
    var form = document.getElementById('form');
    var content = document.getElementById('content');
    var submitButton = document.getElementById('send');

    var name = prompt('What is your name?', 'Guest');
    if(name){
        socket.emit('helloMessage',name);
    }

    submitButton.onclick = function(){
        var text = field.value;
        socket.emit('send', {message: text});

        return false;
    };

    var messages = [];
    socket.on('message', function(data){
        if(data){
            messages.push(data.message);
            var html = '';
            for(var i = 0; i < messages.length; i++){
                html += messages[i] + '<br/>';
            }
            content.innerHTML = html;
        }
    });
};