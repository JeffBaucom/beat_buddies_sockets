var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./")));
app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');
app.get('/', function(req, res) {

  res.sendFile(path.join(__dirname + '/index.html'));
})

var server = app.listen(8000, function() {
 console.log("BEAT BUDDIES listening on port 8000");
});
//SOCKETS
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);

socket.on("note_on", function(data) { // recieve the noteChange object as data
  console.log("note clicked:", data);

  socket.broadcast.emit('add_note', data); //broadcast with the noteChange object
})


})
