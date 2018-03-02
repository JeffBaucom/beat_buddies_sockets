
var muteStatus;


var kickSolo = new Tone.Solo(); //add a solo button
var kickVolume = new Tone.Volume([ volume = -15 ]); //add a volume control
var kickSoloButton = new Nexus.TextButton('#kick-channel', { //create the solo button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
})

var kickMuteButton = new Nexus.TextButton('#kick-channel', { //create the mute button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-mute-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-mute-gray.svg" class="microphone-icon">'
})

var kickClear = new Nexus.TextButton ('#kick-channel-clear', { //create the clear button ui
  'size': [35.5,35.5],
'mode': 'aftertouch',
'state': false,
'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
})

  kick.chain(kickVolume, kickSolo,  Tone.Master); //connect the volume and solo buttons

  kickSoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    kickSolo.solo = v;
    socket.emit("kickSolo", v)

  })
  kickMuteButton.on('change', function(v) { //activate the mute button
    kick.mute = v;
    socket.emit("kickMute", v)
  })

  kickClear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(7, [0,0])

  })


  //snare channel:
var snareSolo = new Tone.Solo(); //add a solo button
var snareVolume = new Tone.Volume([ volume = -15 ]); //add a volume control
var snareSoloButton = new Nexus.TextButton('#snare-channel', { //create the solo button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
})

var snareMuteButton = new Nexus.TextButton('#snare-channel', { //create the mute button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-mute-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-mute-gray.svg" class="microphone-icon">'
})

var snareClear = new Nexus.TextButton ('#snare-channel-clear', { //create the clear button ui
  'size': [35.5,35.5],
'mode': 'aftertouch',
'state': false,
'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
})

snareClear.colorize("fill", "./icon-clear-gray.svg")


  snare.chain(snareVolume, snareSolo,  Tone.Master); //connect the volume and solo buttons

  snareSoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    snareSolo.solo = v;
    socket.emit("snareSolo", v)

  })
  snareMuteButton.on('change', function(v) { //activate the mute button
    snare.mute = v;
    socket.emit("snareMute", v)
  })

  snareClear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(6, [0,0])

  })


    //hh channel:
var hhSolo = new Tone.Solo(); //add a solo button
var hhVolume = new Tone.Volume([ volume = -20 ]); //add a volume control
var hhSoloButton = new Nexus.TextButton('#hh-channel', { //create the solo button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
})

var hhMuteButton = new Nexus.TextButton('#hh-channel', { //create the mute button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-mute-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-mute-gray.svg" class="microphone-icon">'
})

var hhClear = new Nexus.TextButton ('#hh-channel-clear', { //create the clear button ui
  'size': [35.5,35.5],
'mode': 'aftertouch',
'state': false,
'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
})

  hh.chain(hhVolume, hhSolo,  Tone.Master); //connect the volume and solo buttons

  hhSoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    hhSolo.solo = v;
    socket.emit("hhSolo", v)

  })
  hhMuteButton.on('change', function(v) { //activate the mute button
    hh.mute = v;
    socket.emit("hhMute", v)
  })

  hhClear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(5, [0,0])

  })

  //tom2 channel:
  var tom2Solo = new Tone.Solo(); //add a solo button
  var tom2Volume = new Tone.Volume([ volume = -15 ]); //add a volume control
  var tom2SoloButton = new Nexus.TextButton('#tom2-channel', { //create the solo button UI
    'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
  'state': false,
'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
  })

  var tom2MuteButton = new Nexus.TextButton('#tom2-channel', { //create the mute button UI
    'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-mute-white.svg" class="microphone-icon">',
  'state': false,
  'text': '<img src="./assets/icon-mute-gray.svg" class="microphone-icon">'
  })

  var tom2Clear = new Nexus.TextButton ('#tom2-channel-clear', { //create the clear button ui
    'size': [35.5,35.5],
  'mode': 'aftertouch',
  'state': false,
  'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
  })

    tom2.chain(tom2Volume, tom2Solo,  Tone.Master); //connect the volume and solo buttons

    tom2SoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
      tom2Solo.solo = v;
      socket.emit("tom2Solo", v)

    })
    tom2MuteButton.on('change', function(v) { //activate the mute button
      tom2.mute = v;
      socket.emit("tom2Mute", v)
    })

    tom2Clear.on('change', function(v) { //activate the clear button
      drums.matrix.populate.row(4, [0,0])

    })


        //tom1 channel:
var tom1Solo = new Tone.Solo(); //add a solo button
var tom1Volume = new Tone.Volume([ volume = -15 ]); //add a volume control
var tom1SoloButton = new Nexus.TextButton('#tom1-channel', { //create the solo button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
})

var tom1MuteButton = new Nexus.TextButton('#tom1-channel', { //create the mute button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-mute-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-mute-gray.svg" class="microphone-icon">'
})

var tom1Clear = new Nexus.TextButton ('#tom1-channel-clear', { //create the clear button ui
  'size': [35.5,35.5],
'mode': 'aftertouch',
'state': false,
  'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
})

  tom1.chain(tom1Volume, tom1Solo,  Tone.Master); //connect the volume and solo buttons

  tom1SoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    tom1Solo.solo = v;
    socket.emit("tom1Solo", v)

  })
  tom1MuteButton.on('change', function(v) { //activate the mute button
    tom1.mute = v;
    socket.emit("tom1Mute", v)

  })

  tom1Clear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(3, [0,0])

  })

//perc2 channel:
var perc2Solo = new Tone.Solo(); //add a solo button
var perc2Volume = new Tone.Volume([ volume = -15 ]); //add a volume control
var perc2SoloButton = new Nexus.TextButton('#perc2-channel', { //create the solo button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
})

var perc2MuteButton = new Nexus.TextButton('#perc2-channel', { //create the mute button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-mute-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-mute-gray.svg" class="microphone-icon">'
})

var perc2Clear = new Nexus.TextButton ('#perc2-channel-clear', { //create the clear button ui
  'size': [35.5,35.5],
'mode': 'aftertouch',
'state': false,
  'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
})

  perc2.chain(perc2Volume, perc2Solo,  Tone.Master); //connect the volume and solo buttons

  perc2SoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    perc2Solo.solo = v;
    socket.emit("perc2Solo", v)

  })
  perc2MuteButton.on('change', function(v) { //activate the mute button
    perc2.mute = v;
    socket.emit("perc2Mute", v)

  })

  perc2Clear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(2, [0,0])

  })



  //perc1 channel:
var perc1Solo = new Tone.Solo(); //add a solo button
var perc1Volume = new Tone.Volume([ volume = -15 ]); //add a volume control
var perc1SoloButton = new Nexus.TextButton('#perc1-channel', { //create the solo button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
})

var perc1MuteButton = new Nexus.TextButton('#perc1-channel', { //create the mute button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-mute-white.svg" class="perc1Mute microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-mute-gray.svg" class="perc1Mute microphone-icon">'
})

var perc1Clear = new Nexus.TextButton ('#perc1-channel-clear', { //create the clear button ui
  'size': [35.5,35.5],
'mode': 'aftertouch',
'state': false,
  'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
})

  perc1.chain(perc1Volume, perc1Solo,  Tone.Master); //connect the volume and solo buttons

  perc1SoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    perc1Solo.solo = v;
    socket.emit("perc1Solo", v)
  })
  perc1MuteButton.on('change', function(v) { //activate the mute button
    perc1.mute = v;
    socket.emit("perc1Mute", v);

  })

  perc1Clear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(1, [0,0])

  })


//cym channel:
var cymSolo = new Tone.Solo(); //add a solo button
var cymVolume = new Tone.Volume([ volume = -15 ]); //add a volume control
var cymSoloButton = new Nexus.TextButton('#cym-channel', { //create the solo button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
})


var cymMuteButton = new Nexus.TextButton('#cym-channel', { //create the mute button UI
  'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-mute-white.svg" class="cymMute microphone-icon">',
'state': false,
'text': '<img src="./assets/icon-mute-gray.svg" class="cymMute microphone-icon">'
})

var cymClear = new Nexus.TextButton ('#cym-channel-clear', { //create the clear button ui
  'size': [35.5,35.5],
'mode': 'aftertouch',
'state': false,
  'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
})

  cym.chain(cymVolume, cymSolo,  Tone.Master); //connect the volume and solo buttons

  cymSoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    cymSolo.solo = v;
    socket.emit("cymSolo", v)
  })
  cymMuteButton.on('change', function(v) { //activate the mute button
    cym.mute = v;
    socket.emit("cymMute", v);
  })

  cymClear.on('change', function(v) { //activate the clear button
    clearRow = drums.matrix.populate.row(0, [0,0])
  })

// SoloButton Colorize
cymSoloButton.colorize("fill", "#364250")
cymSoloButton.colorize("accent", "#6DCADE")

perc1SoloButton.colorize("fill", "#364250")
perc1SoloButton.colorize("accent", "#6DCADE")

perc2SoloButton.colorize("fill", "#364250")
perc2SoloButton.colorize("accent", "#6DCADE")

tom1SoloButton.colorize("fill", "#364250")
tom1SoloButton.colorize("accent", "#6DCADE")

tom2SoloButton.colorize("fill", "#364250")
tom2SoloButton.colorize("accent", "#6DCADE")

hhSoloButton.colorize("fill", "#364250")
hhSoloButton.colorize("accent", "#6DCADE")

snareSoloButton.colorize("fill", "#364250")
snareSoloButton.colorize("accent", "#6DCADE")

kickSoloButton.colorize("fill", "#364250")
kickSoloButton.colorize("accent", "#6DCADE")

// MuteButton Colorize
cymMuteButton.colorize("fill", "#364250")
cymMuteButton.colorize("accent", "#6DCADE")

perc1MuteButton.colorize("fill", "#364250")
perc1MuteButton.colorize("accent", "#6DCADE")

perc2MuteButton.colorize("fill", "#364250")
perc2MuteButton.colorize("accent", "#6DCADE")

tom1MuteButton.colorize("fill", "#364250")
tom1MuteButton.colorize("accent", "#6DCADE")

tom2MuteButton.colorize("fill", "#364250")
tom2MuteButton.colorize("accent", "#6DCADE")

hhMuteButton.colorize("fill", "#364250")
hhMuteButton.colorize("accent", "#6DCADE")

snareMuteButton.colorize("fill", "#364250")
snareMuteButton.colorize("accent", "#6DCADE")

kickMuteButton.colorize("fill", "#364250")
kickMuteButton.colorize("accent", "#6DCADE")

// ClearButton Colorize
cymClear.colorize("fill", "#364250")
cymClear.colorize("accent", "#6DCADE")

perc1Clear.colorize("fill", "#364250")
perc1Clear.colorize("accent", "#6DCADE")

perc2Clear.colorize("fill", "#364250")
perc2Clear.colorize("accent", "#6DCADE")

tom1Clear.colorize("fill", "#364250")
tom1Clear.colorize("accent", "#6DCADE")

tom2Clear.colorize("fill", "#364250")
tom2Clear.colorize("accent", "#6DCADE")

hhClear.colorize("fill", "#364250")
hhClear.colorize("accent", "#6DCADE")

snareClear.colorize("fill", "#364250")
snareClear.colorize("accent", "#6DCADE")

kickClear.colorize("fill", "#364250")
kickClear.colorize("accent", "#6DCADE")
