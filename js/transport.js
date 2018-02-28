var socket  = io.connect();




// ####################################SOCKETS####################################

//RECEIVERS
socket.on('change_tempo', function(data) {
    if (tempoSlider.value != data) {
        tempoSlider.value = data;
    }
});

socket.on('transport_play', function(v) {
    Tone.Transport.start();
});

socket.on('transport_stop', function(v) {
    Tone.Transport.stop();
});

//send tempo change with value
tempoSlider.on('change', function(v) {
    //change the tempo on value change
    Tone.Transport.bpm.value = v;
    socket.emit('tempo_changed', v);

});

play.on('change', function(v) {
    Tone.Transport.start();
    socket.emit("transport_play", v);
});

stop.on('change', function(v) {
    Tone.Transport.stop();
    socket.emit("transport_stop", v);
});
