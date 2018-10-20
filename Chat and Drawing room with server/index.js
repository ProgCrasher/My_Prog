var express = require('express');
var fs = require('fs');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [];
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

io.on('connection', function (socket) {
    for (var i in messages) {
        socket.emit("display message", messages[i]);
    }
    
    socket.on("send message", function (data) {
        messages.push(data);
        io.sockets.emit("display message", data);
        fs.writeFileSync("Messages_data.json", JSON.stringify(messages));
        fs.readFileSync("Messages_data.json").toString();
    })
    socket.on('mouse', mouseMsg);
    function mouseMsg(data){
        socket.broadcast.emit('mouse',data);
        console.log(data);
    }
});