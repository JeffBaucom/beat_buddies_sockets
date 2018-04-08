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


//DRUMS
socket.on("note_on", function(data) { // recieve the noteChange object as data
//  console.log("note clicked:", data);
  socket.broadcast.emit('add_note', data); //broadcast with the noteChange object
})

//CHANNEL STRIP
//MUTES
socket.on("cymMute", function(toggle) {
  socket.broadcast.emit('cymMute', toggle)
});
socket.on("perc1Mute", function(toggle) {
  socket.broadcast.emit('perc1Mute', toggle)
});
socket.on("perc2Mute", function(toggle) {
  socket.broadcast.emit('perc2Mute', toggle)
});
socket.on("tom1Mute", function(toggle) {
  socket.broadcast.emit('tom1Mute', toggle)
});
socket.on("tom2Mute", function(toggle) {
  socket.broadcast.emit('tom2Mute', toggle)
});
socket.on("hhMute", function(toggle) {
  socket.broadcast.emit('hhMute', toggle)
});
socket.on("snareMute", function(toggle) {
  socket.broadcast.emit('snareMute', toggle)
});
socket.on("kickMute", function(toggle) {
  socket.broadcast.emit('kickMute', toggle)
});

//SOLOS
socket.on("cymSolo", function(toggle) {
  socket.broadcast.emit('cymSolo', toggle)
});

socket.on("perc1Solo", function(toggle) {
  socket.broadcast.emit('perc1Solo', toggle)
});

socket.on("perc2Solo", function(toggle) {
  socket.broadcast.emit('perc2Solo', toggle)
});

socket.on("tom1Solo", function(toggle) {
  socket.broadcast.emit('tom1Solo', toggle)
});

socket.on("tom2Solo", function(toggle) {
  socket.broadcast.emit('tom2Solo', toggle)
});

socket.on("hhSolo", function(toggle) {
  socket.broadcast.emit('hhSolo', toggle)
});

socket.on("snareSolo", function(toggle) {
  socket.broadcast.emit('snareSolo', toggle)
});

socket.on("kickSolo", function(toggle) {
  socket.broadcast.emit('kickSolo', toggle)
});



//Clears
socket.on("cymClear", function(v) {
  socket.broadcast.emit('cymClear', v)
});

socket.on("perc1Clear", function(v) {
  socket.broadcast.emit('perc1Clear', v)
});

socket.on("perc2Clear", function(v) {
  socket.broadcast.emit('perc2Clear', v)
});

socket.on("tom1Clear", function(v) {
  socket.broadcast.emit('tom1Clear', v)
});

socket.on("tom2Clear", function(v) {
  socket.broadcast.emit('tom2Clear', v)
});

socket.on("hhClear", function(v) {
  socket.broadcast.emit('hhClear', v)
});
socket.on("snareClear", function(v) {
  socket.broadcast.emit('snareClear', v)

});socket.on("kickClear", function(v) {
  socket.broadcast.emit('kickClear', v)
});

//drum selector socket
socket.on("changeDrums", function(value) {
  socket.broadcast.emit("changeDrums", value);
});

//GLOBAL SOLO CLEAR
socket.on("solo_clear", function() {
  socket.broadcast.emit("solo_clear");
})


//GLOBAL MUTE clear
socket.on("mute_clear", function() {
  socket.broadcast.emit("mute_clear");

})

//TRANSPORT
// socket.on("tempo_changed", function(data) {
// //    console.log("tempo changed:", data);
//     socket.broadcast.emit('change_tempo', data);
// });
//
// socket.on("transport_play", function(data) {
// //    console.log("tempo changed:", data);
//     socket.broadcast.emit('transport_play', data);
// });
//
// socket.on("transport_stop", function(data) {
// //    console.log("tempo changed:", data);
//     socket.broadcast.emit('transport_stop', data);
// });

})
