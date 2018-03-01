$(document).ready(function (){

  // Declare slider and attach to div id
  var tempoSlider = new Nexus.Slider('#tempoSlider', {
      'size': [240, 20],
      'min': 1,
      'max': 250,
      'mode': 'absolute',
      'step': 1,
      'value': 110
  });

  //initialize tempo at current value
  Tone.Transport.bpm.value = tempoSlider.value;
  var tempoNumber = new Nexus.Number('#tempoNumber');
  tempoNumber.link(tempoSlider); //link the slider and number label together

  var play = new Nexus.TextButton('#play', { //create the play button UI
      'text': '<i class="fas fa-play fa-5x"></i>',
      'alternateText': '<i class="fas fa-pause fa-5x"></i>'
  });
  // var stop = new Nexus.TextButton('#stop', { //create the stop button UI
  //     'text': 'Stop'
  // });

// ####################################SOCKETS####################################
//send tempo change with value
tempoSlider.on('change', function(v) {
    //change the tempo on value change
    Tone.Transport.bpm.value = v;
    // socket.emit('tempo_changed', v);

});

// play button
  play.on('change', function(v) {
    console.log(v)
    if (v == true) {
      Tone.Transport.start();
      loop.start();

    } else {
      Tone.Transport.stop()
    }
  });

//RECEIVERS
  // socket.on('change_tempo', function(data) {
//       if (tempoSlider.value != data) {
//           tempoSlider.value = data;
//       }
//   });
//
//   socket.on('transport_play', function(v) {
//       Tone.Transport.start();
//   });
//
//   socket.on('transport_stop', function(v) {
//       Tone.Transport.stop();
//   });
});
