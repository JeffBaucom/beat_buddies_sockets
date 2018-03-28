
var drumGrid = [600, 300];

// buttons are 200/8 tall

var drums = new Nexus.Sequencer("#drums", {
    'size': drumGrid,
    'mode': 'toggle',
    // 'matrixLabels': ['Kick', 'HH', 'Snare'],
    'rows': 8,
    'columns': 16
});
drums.colorize('fill', '#364250');
drums.colorize("accent","#8ADBED")

var kit = ['cym','perc1', 'perc2', 'tom2', 'tom1','hh','snare','kick' ]


var kitSounds = new Tone.Players({
  "cym" : "./sounds/electric/crash.wav",
  "perc1" : "./sounds/electric/cowbell.wav",
  "perc2" : "./sounds/electric/clap.WAV",
  "tom1" : "./sounds/electric/hightom.wav",
  "tom2" : "./sounds/electric/floortom.wav",
  "hh" : "./sounds/electric/hh.wav",
  "snare" : "./sounds/electric/snare.wav",
  "kick" : "./sounds/electric/kick.wav",

}, {"volume" : -15, "fadeOut": "64n"});
// .toMaster();
//DISABLE TO MASTER FOR CHANNEL STRIP CONTROL

//INDIVIDUAL PLAYERS:
// var kick = kitSounds.get('kick') //get the player
// var snare = kitSounds.get('snare') //get the player
// var hh = kitSounds.get('hh') //get the player
// var tom1 = kitSounds.get('tom1') //get the player
// var tom2 = kitSounds.get('tom2') //get the player
// var perc1 = kitSounds.get('perc1') //get the player
// var perc2 = kitSounds.get('perc2') //get the player
// var cym =  kitSounds.get('cym') //get the player


//KEYBOARD FX
var fx = new Tone.Players({
  "khaled" : "./sounds/fx/khaled.m4a",
  "airhorn" : "./sounds/fx/horn.m4a"
}, {"volume" : -15, "fadeOut": "64n"}).toMaster();

var khaled = fx.get('khaled')
var airhorn = fx.get('airhorn')

$(document).keypress(function(e) {
  if (e.charCode == 107) {
    khaled.start();
    // socket.emit("solo_clear");
  }
})


$(document).keypress(function(e) {
  if (e.charCode == 104) {
    airhorn.start();
    // socket.emit("solo_clear");
  }
})


//MATRIX LABELS
// var kickLabel = new Nexus.TextButton ('#kick-label', { //create the kick button ui
//   'size': [100,35.5],
// 'mode': 'aftertouch',
// 'state': false,
// 'text': '<div class="white-text">kick</div>'
// })
//
// kickLabel.on('change', function(v) {
//   if (v == true) {
//     kick.start();
//   }
// })
//
// var snareLabel = new Nexus.TextButton ('#snare-label', { //create the snare button ui
//   'size': [100,35.5],
// 'mode': 'aftertouch',
// 'state': false,
// 'text': '<div class="white-text">snare</div>'
// })
//
// snareLabel.on('change', function(v) {
//   if (v == true) {
//     snare.start();
//   }
// })
//
// var hhLabel = new Nexus.TextButton ('#hh-label', { //create the hh button ui
//   'size': [100,35.5],
// 'mode': 'aftertouch',
// 'state': false,
// 'text': '<div class="white-text">hh</div>'
// })
//
// hhLabel.on('change', function(v) {
//   if (v == true) {
//     hh.start();
//   }
// })
//
// var tom1Label = new Nexus.TextButton ('#tom1-label', { //create the tom1 button ui
//   'size': [100,35.5],
// 'mode': 'aftertouch',
// 'state': false,
// 'text': '<div class="white-text">tom 1</div>'
// })
//
// tom1Label.on('change', function(v) {
//   if (v == true) {
//     tom1.start();
//   }
// })
//
//
// var tom2Label = new Nexus.TextButton ('#tom2-label', { //create the tom2 button ui
//   'size': [100,35.5],
// 'mode': 'aftertouch',
// 'state': false,
// 'text': '<div class="white-text">tom 2</div>'
// })
//
// tom2Label.on('change', function(v) {
//   if (v == true) {
//     tom2.start();
//   }
// })
//
// var perc1Label = new Nexus.TextButton ('#perc2-label', { //create the perc1 button ui
//   'size': [100,35.5],
// 'mode': 'aftertouch',
// 'state': false,
// 'text': '<div class="white-text">perc 2</div>'
// })
//
// perc1Label.on('change', function(v) {
//   if (v == true) {
//     perc1.start();
//   }
// })
//
// var perc2Label = new Nexus.TextButton ('#perc1-label', { //create the perc2 button ui
//   'size': [100,35.5],
// 'mode': 'aftertouch',
// 'state': false,
// 'text': '<div class="white-text">perc 1</div>'
// })
//
// perc2Label.on('change', function(v) {
//   if (v == true) {
//     perc2.start();
//   }
// })
//
// var cymLabel = new Nexus.TextButton ('#cym-label', { //create the cym button ui
//   'size': [100,35.5],
// 'mode': 'aftertouch',
// 'state': false,
// 'text': '<div class="white-text">cym</div>'
// })
//
// cymLabel.on('change', function(v) {
//   if (v == true) {
//     cym.start();
//   }
// })
//Preset selector

var drumPresets = new Nexus.Select('#drum-selector',{ //instrument selector UI
  'size': [150,35.5],
  'options': ['Electric','Acoustic']
})

drumPresets.colorize("fill", "#364250")
drumPresets.colorize("accent")

drumPresets.on('change', function(v) { //selector
  socket.emit("changeDrums", v.value)
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


  // SOCKETS

// ALL DRUMS
var drumUpdate = {} //global variable to save the change into

drums.on('change', function(v) {
drumUpdate = v; //reassign drumUpdate for the new change
// console.log(drumUpdate);
});

$('#drums').children().click(function(v) {
  socket.emit("note_on", drumUpdate)
})
// IDEA: to enable dragging, send entire pattern on drag-end or mouseup




//receive the broadcast and toggle the cell
socket.on('add_note', function(data) {
  // console.log("received from the server");
  // console.log("note change received from server", data);
  if (drums.matrix.pattern[data.row][data.column] != data.state) { //if the pattern value is already true, don't toggle
    drums.matrix.toggle.cell(data.column, data.row);
  }
  });




//DRUM SELECTOR
socket.on("changeDrums", function(kit) {
  // console.log(drumPresets);
  // console.log(drumPresets._value)
  // console.log(kit)
  if (drumPresets._value != kit) {

    drumPresets._value = kit;
    drumPresets.value = kit;
  }
})

//RECEIVERS

//Labels.Colorize
// cymLabel.colorize("fill", "#4D5B6A")
// cymLabel.colorize("accent", "#6DCADE")
//
// perc1Label.colorize("fill", "#4D5B6A")
// perc1Label.colorize("accent", "#6DCADE")
//
// perc2Label.colorize("fill", "#4D5B6A")
// perc2Label.colorize("accent", "#6DCADE")
//
// tom1Label.colorize("fill", "#4D5B6A")
// tom1Label.colorize("accent", "#6DCADE")
//
// tom2Label.colorize("fill", "#4D5B6A")
// tom2Label.colorize("accent", "#6DCADE")
//
// hhLabel.colorize("fill", "#4D5B6A")
// hhLabel.colorize("accent", "#6DCADE")
//
// snareLabel.colorize("fill", "#4D5B6A")
// snareLabel.colorize("accent", "#6DCADE")
//
// kickLabel.colorize("fill", "#4D5B6A")
// kickLabel.colorize("accent", "#6DCADE")
