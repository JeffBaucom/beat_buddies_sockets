//Mutes
socket.on('cymMute', function(toggle) {
  if (toggle != cymMuteButton.state) {
  cymMuteButton.state = toggle;
  }
})
socket.on('perc1Mute', function(toggle) {
  if (toggle != perc1MuteButton.state) {
  perc1MuteButton.state = toggle;
 }
})
socket.on('perc2Mute', function(toggle) {
  if (toggle != perc2MuteButton.state) {
  perc2MuteButton.state = toggle;
  }
})
socket.on('tom1Mute', function(toggle) {
  if (toggle != tom1MuteButton.state) {
  tom1MuteButton.state = toggle;
  }
})
socket.on('tom2Mute', function(toggle) {
  if (toggle != tom2MuteButton.state) {
  tom2MuteButton.state = toggle;
  }
})
socket.on('hhMute', function(toggle) {
  if (toggle != hhMuteButton.state) {
  hhMuteButton.state = toggle;
  }
})
socket.on('snareMute', function(toggle) {
  if (toggle != snareMuteButton.state) {
  snareMuteButton.state = toggle;
  }
})
socket.on('kickMute', function(toggle) {
  if (toggle != kickMuteButton.state) {
  kickMuteButton.state = toggle;
  }
})


//SOLOS
socket.on('cymSolo', function(toggle) {
  if (toggle != cymSolo.solo) {
  cymSolo.solo = toggle;
  cymSoloButton.state = toggle;

  }
})

socket.on('perc1Solo', function(toggle) {
  if (toggle != perc1Solo.solo) {
  perc1Solo.solo = toggle;
  perc1SoloButton.state = toggle;

  }
})

socket.on('perc2Solo', function(toggle) {
  if (toggle != perc2Solo.solo) {
  perc2Solo.solo = toggle;
  perc2SoloButton.state = toggle;

  }
})

socket.on('tom1Solo', function(toggle) {
  if (toggle != tom1Solo.solo) {
  tom1Solo.solo = toggle;
  tom1SoloButton.state = toggle;

  }
})

socket.on('tom2Solo', function(toggle) {
  if (toggle != tom2Solo.solo) {
  tom2Solo.solo = toggle;
  tom2SoloButton.state = toggle;
  }
})

socket.on('hhSolo', function(toggle) {
  if (toggle != hhSolo.solo) {
  hhSolo.solo = toggle;
  hhSoloButton.state = toggle;

  }
})

socket.on('snareSolo', function(toggle) {
  if (toggle != snareSolo.solo) {
  snareSolo.solo = toggle;
  snareSoloButton.state = toggle;

  }
})

socket.on('kickSolo', function(toggle) {
  if (toggle != kickSolo.solo) {
  kickSolo.solo = toggle;
  kickSoloButton.state = toggle;
  }
})


// GLOBAL SOLO CLEAR

function globalSoloClear() {
  kickSoloButton.state = false;
  snareSoloButton.state = false;
  hhSoloButton.state = false;
  tom1SoloButton.state = false;
  tom2SoloButton.state = false;
  perc1SoloButton.state = false;
  perc2SoloButton.state = false;
  cymSoloButton.state = false;
}

$(document).keypress(function(e) {
  if (e.charCode == 122) {
    globalSoloClear();
    socket.emit("solo_clear");
  }
})

socket.on("solo_clear", function() {
  globalSoloClear();
})


//GLOBAL MUTE CLEAR

function globalMuteClear() {
  kickMuteButton.state = false;
  snareMuteButton.state = false;
  hhMuteButton.state = false;
  tom1MuteButton.state = false;
  tom2MuteButton.state = false;
  perc1MuteButton.state = false;
  perc2MuteButton.state = false;
  cymMuteButton.state = false;
}

$(document).keypress(function(e) {
  if (e.charCode == 109) {
    globalMuteClear();
    socket.emit("mute_clear");
  }
})

socket.on("mute_clear", function() {
  globalMuteClear();
})
