var socket  = io.connect();
var drumGrid = [400, 200];

// buttons are 200/8 tall

var drums = new Nexus.Sequencer("#drums", {
    'size': drumGrid,
    'mode': 'toggle',
    // 'matrixLabels': ['Kick', 'HH', 'Snare'],
    'rows': 8,
    'columns': 16
});

drums.colorize('fill', '#547AFF');
drums.colorize("accent","#BAFFAD")

var kit = ['cym','perc2', 'perc1', 'tom2', 'tom1','hh','snare','kick' ]

var kitSounds = new Tone.Players({
  "cym" : "./sounds/acoustic/crash.wav",
  "perc1" : "./sounds/acoustic/block.WAV",
  "perc2" : "./sounds/acoustic/cowbell.wav",
  "tom1" : "./sounds/acoustic/hightom.wav",
  "tom2" : "./sounds/acoustic/floortom.wav",
  "hh" : "./sounds/acoustic/hh.wav",
  "snare" : "./sounds/acoustic/snare.wav",
  "kick" : "./sounds/acoustic/kick.wav",

}, {"volume" : -15, "fadeOut": "64n"});
// .toMaster();
//DISABLE TO MASTER FOR CHANNEL STRIP CONTROL

//INDIVIDUAL PLAYERS:
var kick = kitSounds.get('kick') //get the player
var snare = kitSounds.get('snare') //get the player
var hh = kitSounds.get('hh') //get the player
var tom1 = kitSounds.get('tom1') //get the player
var tom2 = kitSounds.get('tom2') //get the player
var perc1 = kitSounds.get('perc1') //get the player
var perc2 = kitSounds.get('perc2') //get the player
var cym =  kitSounds.get('cym') //get the player


//MATRIX LABELS
var kickLabel = new Nexus.TextButton ('#kick-label', { //create the kick button ui
  'size': [100,25],
'mode': 'aftertouch',
'state': false,
'text': 'kick'
})

kickLabel.on('change', function(v) {
  if (v == true) {
    kick.start();
  }
})

var snareLabel = new Nexus.TextButton ('#snare-label', { //create the snare button ui
  'size': [100,25],
'mode': 'aftertouch',
'state': false,
'text': 'snare'
})

snareLabel.on('change', function(v) {
  if (v == true) {
    snare.start();
  }
})

var hhLabel = new Nexus.TextButton ('#hh-label', { //create the hh button ui
  'size': [100,25],
'mode': 'aftertouch',
'state': false,
'text': 'hh'
})

hhLabel.on('change', function(v) {
  if (v == true) {
    hh.start();
  }
})

var tom1Label = new Nexus.TextButton ('#tom1-label', { //create the tom1 button ui
  'size': [100,25],
'mode': 'aftertouch',
'state': false,
'text': 'tom1'
})

tom1Label.on('change', function(v) {
  if (v == true) {
    tom1.start();
  }
})


var tom2Label = new Nexus.TextButton ('#tom2-label', { //create the tom2 button ui
  'size': [100,25],
'mode': 'aftertouch',
'state': false,
'text': 'tom2'
})

tom2Label.on('change', function(v) {
  if (v == true) {
    tom2.start();
  }
})

var perc1Label = new Nexus.TextButton ('#perc1-label', { //create the perc1 button ui
  'size': [100,25],
'mode': 'aftertouch',
'state': false,
'text': 'perc1'
})

perc1Label.on('change', function(v) {
  if (v == true) {
    perc1.start();
  }
})

var perc2Label = new Nexus.TextButton ('#perc2-label', { //create the perc2 button ui
  'size': [100,25],
'mode': 'aftertouch',
'state': false,
'text': 'perc2'
})

perc2Label.on('change', function(v) {
  if (v == true) {
    perc2.start();
  }
})

var cymLabel = new Nexus.TextButton ('#cym-label', { //create the cym button ui
  'size': [100,25],
'mode': 'aftertouch',
'state': false,
'text': 'cym'
})

cymLabel.on('change', function(v) {
  if (v == true) {
    cym.start();
  }
})
//Preset selector

var drumPresets = new Nexus.Select('#presets',{ //instrument selector UI
  'size': [100,40],
  'options': ['Acoustic','Electric']
})

drumPresets.on('change', function(v) { //selector
  console.log(v);
  if (v.value == "Acoustic") {
    kitSounds.get('kick').load("./sounds/acoustic/kick.wav");
    kitSounds.get('snare').load("./sounds/acoustic/snare.wav");
    kitSounds.get('hh').load("./sounds/acoustic/hh.wav");
    kitSounds.get('tom1').load("./sounds/acoustic/hightom.wav");
    kitSounds.get('tom2').load("./sounds/acoustic/floortom.wav");
    kitSounds.get('perc1').load("./sounds/acoustic/cowbell.wav");
    kitSounds.get('perc2').load("./sounds/acoustic/block.wav");
    kitSounds.get('cym').load("./sounds/acoustic/crash.wav");
    }
    else if (v.value == "Electric"){
      kitSounds.get('kick').load("./sounds/electric/kick.wav");
      kitSounds.get('snare').load("./sounds/electric/snare.wav");
      kitSounds.get('hh').load("./sounds/electric/hh.wav");
      kitSounds.get('tom1').load("./sounds/electric/hightom.wav");
      kitSounds.get('tom2').load("./sounds/electric/floortom.wav");
      kitSounds.get('perc1').load("./sounds/electric/cowbell.wav");
      kitSounds.get('perc2').load("./sounds/electric/clap.wav");
      kitSounds.get('cym').load("./sounds/electric/crash.wav");

    }
  })

// kick channel:

var kickSolo = new Tone.Solo(); //add a solo button
var kickVolume = new Tone.Volume([ volume = -15 ]); //add a volume control
var kickSoloButton = new Nexus.TextButton('#kick-channel', { //create the solo button UI
  'size': [40,40],
'alternateText': 'S',
'state': false,
'text': 'S'
})

var kickMuteButton = new Nexus.TextButton('#kick-channel', { //create the mute button UI
  'size': [40,40],
'alternateText': 'M',
'state': false,
'text': 'M'
})

var kickClear = new Nexus.TextButton ('#kick-channel', { //create the clear button ui
  'size': [40,40],
'mode': 'aftertouch',
'state': false,
'text': 'C'
})

  kick.chain(kickVolume, kickSolo,  Tone.Master); //connect the volume and solo buttons

  kickSoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    kickSolo.solo = v;
    console.log(v);

  })
  kickMuteButton.on('change', function(v) { //activate the mute button
    kick.mute = v;
  })

  kickClear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(7, [0,0])

  })

  //snare channel:
var snareSolo = new Tone.Solo(); //add a solo button
var snareVolume = new Tone.Volume([ volume = -15 ]); //add a volume control
var snareSoloButton = new Nexus.TextButton('#snare-channel', { //create the solo button UI
  'size': [40,40],
'alternateText': 'S',
'state': false,
'text': 'S'
})

var snareMuteButton = new Nexus.TextButton('#snare-channel', { //create the mute button UI
  'size': [40,40],
'alternateText': 'M',
'state': false,
'text': 'M'
})

var snareClear = new Nexus.TextButton ('#snare-channel', { //create the clear button ui
  'size': [40,40],
'mode': 'aftertouch',
'state': false,
'text': 'C'
})

  snare.chain(snareVolume, snareSolo,  Tone.Master); //connect the volume and solo buttons

  snareSoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    snareSolo.solo = v;
    console.log(v);

  })
  snareMuteButton.on('change', function(v) { //activate the mute button
    snare.mute = v;
  })

  snareClear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(7, [0,0])

  })


    //hh channel:
var hhSolo = new Tone.Solo(); //add a solo button
var hhVolume = new Tone.Volume([ volume = -15 ]); //add a volume control
var hhSoloButton = new Nexus.TextButton('#hh-channel', { //create the solo button UI
  'size': [40,40],
'alternateText': 'S',
'state': false,
'text': 'S'
})

var hhMuteButton = new Nexus.TextButton('#hh-channel', { //create the mute button UI
  'size': [40,40],
'alternateText': 'M',
'state': false,
'text': 'M'
})

var hhClear = new Nexus.TextButton ('#hh-channel', { //create the clear button ui
  'size': [40,40],
'mode': 'aftertouch',
'state': false,
'text': 'C'
})

  hh.chain(hhVolume, hhSolo,  Tone.Master); //connect the volume and solo buttons

  hhSoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    hhSolo.solo = v;
    console.log(v);

  })
  hhMuteButton.on('change', function(v) { //activate the mute button
    hh.mute = v;
  })

  hhClear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(7, [0,0])

  })

  //tom2 channel:
  var tom2Solo = new Tone.Solo(); //add a solo button
  var tom2Volume = new Tone.Volume([ volume = -15 ]); //add a volume control
  var tom2SoloButton = new Nexus.TextButton('#tom2-channel', { //create the solo button UI
    'size': [40,40],
  'alternateText': 'S',
  'state': false,
  'text': 'S'
  })

  var tom2MuteButton = new Nexus.TextButton('#tom2-channel', { //create the mute button UI
    'size': [40,40],
  'alternateText': 'M',
  'state': false,
  'text': 'M'
  })

  var tom2Clear = new Nexus.TextButton ('#tom2-channel', { //create the clear button ui
    'size': [40,40],
  'mode': 'aftertouch',
  'state': false,
  'text': 'C'
  })

    tom2.chain(tom2Volume, tom2Solo,  Tone.Master); //connect the volume and solo buttons

    tom2SoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
      tom2Solo.solo = v;
      console.log(v);

    })
    tom2MuteButton.on('change', function(v) { //activate the mute button
      tom2.mute = v;
    })

    tom2Clear.on('change', function(v) { //activate the clear button
      drums.matrix.populate.row(7, [0,0])

    })


        //tom1 channel:
var tom1Solo = new Tone.Solo(); //add a solo button
var tom1Volume = new Tone.Volume([ volume = -15 ]); //add a volume control
var tom1SoloButton = new Nexus.TextButton('#tom1-channel', { //create the solo button UI
  'size': [40,40],
'alternateText': 'S',
'state': false,
'text': 'S'
})

var tom1MuteButton = new Nexus.TextButton('#tom1-channel', { //create the mute button UI
  'size': [40,40],
'alternateText': 'M',
'state': false,
'text': 'M'
})

var tom1Clear = new Nexus.TextButton ('#tom1-channel', { //create the clear button ui
  'size': [40,40],
'mode': 'aftertouch',
'state': false,
'text': 'C'
})

  tom1.chain(tom1Volume, tom1Solo,  Tone.Master); //connect the volume and solo buttons

  tom1SoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    tom1Solo.solo = v;
    console.log(v);

  })
  tom1MuteButton.on('change', function(v) { //activate the mute button
    tom1.mute = v;
  })

  tom1Clear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(7, [0,0])

  })

//perc2 channel:
var perc2Solo = new Tone.Solo(); //add a solo button
var perc2Volume = new Tone.Volume([ volume = -15 ]); //add a volume control
var perc2SoloButton = new Nexus.TextButton('#perc2-channel', { //create the solo button UI
  'size': [40,40],
'alternateText': 'S',
'state': false,
'text': 'S'
})

var perc2MuteButton = new Nexus.TextButton('#perc2-channel', { //create the mute button UI
  'size': [40,40],
'alternateText': 'M',
'state': false,
'text': 'M'
})

var perc2Clear = new Nexus.TextButton ('#perc2-channel', { //create the clear button ui
  'size': [40,40],
'mode': 'aftertouch',
'state': false,
'text': 'C'
})

  perc2.chain(perc2Volume, perc2Solo,  Tone.Master); //connect the volume and solo buttons

  perc2SoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    perc2Solo.solo = v;
    console.log(v);

  })
  perc2MuteButton.on('change', function(v) { //activate the mute button
    perc2.mute = v;
  })

  perc2Clear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(7, [0,0])

  })



  //perc1 channel:
var perc1Solo = new Tone.Solo(); //add a solo button
var perc1Volume = new Tone.Volume([ volume = -15 ]); //add a volume control
var perc1SoloButton = new Nexus.TextButton('#perc1-channel', { //create the solo button UI
  'size': [40,40],
'alternateText': 'S',
'state': false,
'text': 'S'
})

var perc1MuteButton = new Nexus.TextButton('#perc1-channel', { //create the mute button UI
  'size': [40,40],
'alternateText': 'M',
'state': false,
'text': 'M'
})

var perc1Clear = new Nexus.TextButton ('#perc1-channel', { //create the clear button ui
  'size': [40,40],
'mode': 'aftertouch',
'state': false,
'text': 'C'
})

  perc1.chain(perc1Volume, perc1Solo,  Tone.Master); //connect the volume and solo buttons

  perc1SoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    perc1Solo.solo = v;
    console.log(v);

  })
  perc1MuteButton.on('change', function(v) { //activate the mute button
    perc1.mute = v;
  })

  perc1Clear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(7, [0,0])

  })


//cym channel:
var cymSolo = new Tone.Solo(); //add a solo button
var cymVolume = new Tone.Volume([ volume = -15 ]); //add a volume control
var cymSoloButton = new Nexus.TextButton('#cym-channel', { //create the solo button UI
  'size': [40,40],
'alternateText': 'S',
'state': false,
'text': 'S'
})

var cymMuteButton = new Nexus.TextButton('#cym-channel', { //create the mute button UI
  'size': [40,40],
'alternateText': 'M',
'state': false,
'text': 'M'
})

var cymClear = new Nexus.TextButton ('#cym-channel', { //create the clear button ui
  'size': [40,40],
'mode': 'aftertouch',
'state': false,
'text': 'C'
})

  cym.chain(cymVolume, cymSolo,  Tone.Master); //connect the volume and solo buttons

  cymSoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    cymSolo.solo = v;
    console.log(v);

  })
  cymMuteButton.on('change', function(v) { //activate the mute button
    cym.mute = v;
  })

  cymClear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(7, [0,0])

  })
  // SOCKETS

//receive the broadcast and toggle the cell
socket.on('add_note', function(data) {
  console.log("note change received from server", data);
  if (drums.matrix.pattern[data.row][data.column] != data.state ) { //if the pattern value is already true, don't toggle
    drums.matrix.toggle.cell(data.column, data.row);
  }
});
//saves the value of the note into the variable
drums.on('change', function(v) {
 // noteChange = v;
 socket.emit("note_on", v);
});
