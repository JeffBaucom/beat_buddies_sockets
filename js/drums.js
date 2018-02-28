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

}, {"volume" : -15, "fadeOut": "64n"}).toMaster();
//DISABLE TO MASTER FOR CHANNEL STRIP CONTROL


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

var kick =   kitSounds.get('kick') //get the player
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
  // var snare =   kitSounds.get('snare') //get the player
  // var snareSolo = new Tone.Solo(); //add a solo button
  // var snareVolume = new Tone.Volume([ volume = -15 ]); //add a volume control
  // var snareSoloButton = new Nexus.TextButton('#snare-channel', { //create the solo button UI
  //   'size': [40,40],
  // 'alternateText': 'S',
  // 'state': false,
  // 'text': 'S'
  // })
  //
  // var snareMuteButton = new Nexus.TextButton('#snare-channel', { //create the mute button UI
  //   'size': [40,40],
  // 'alternateText': 'M',
  // 'state': false,
  // 'text': 'M'
  // })
  //
  // var snareSelector = new Nexus.Select('#snare-selector',{ //instrument selector UI
  //   'size': [80,40],
  //   'options': ['snare','snare2']
  // })
  //
  // var snareClear = new Nexus.TextButton ('#snare-channel', { //create the clear button ui
  //   'size': [40,40],
  // 'mode': 'aftertouch',
  // 'state': false,
  // 'text': 'C'
  // })
  //
  //   snare.chain(snareVolume, snareSolo,  Tone.Master); //connect the volume and solo buttons
  //
  //   snareSoloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
  //     snareSolo.solo = v;
  //     console.log(v);
  //
  //   })
  //   snareMuteButton.on('change', function(v) { //activate the mute button
  //     snare.mute = v;
  //   })
  //
  //   snareClear.on('change', function(v) { //activate the clear button
  //     drums.matrix.populate.row(7, [0,0])
  //
  //   })
  //   snareSelector.on('change', function(v) { //selector
  //       kitSounds.get('snare').load("./sounds/snares/" + v.value + ".wav");
  //     })
  //



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
