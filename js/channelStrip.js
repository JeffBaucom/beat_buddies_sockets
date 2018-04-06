var kitSounds = new Tone.Players({
  "cym" : "./sounds/electric/crash.wav",
  "perc1" : "./sounds/electric/cowbell.wav",
  "perc2" : "./sounds/electric/clap.WAV",
  "tom1" : "./sounds/electric/hightom.wav",
  "tom2" : "./sounds/electric/floortom.wav",
  "hh" : "./sounds/electric/hh.wav",
  "snare" : "./sounds/electric/snare.wav",
  "kick" : "./sounds/electric/kick.wav",

}, {"volume" : -15, "fadeOut": "64n"}) //must be connected to the master


function Channel(name, row) {
let parent = this;
let div = document.getElementById('mixer');
  div.innerHTML += "<div class ='button-row d-flex flex-row'>"
+ "<div id='" + name + "-channel-clear' class ='" + name +"-channel d-flex flex-row'>"
+ "</div><div id='" + name +"-label' class='label'></div>"
  + "<div id='" + name + "-channel' class ='" + name + "-channel smButton d-flex flex-row'>"
  +"</div></div>";

  let player = kitSounds.get(name)

  // this.player = kitSounds.get(name);


  let solo = new Tone.Solo();
  let volume = new Tone.Volume(); //[volume = -15 ]
  let soloButton = new Nexus.TextButton("#" + name + "-channel", {
    'size': [35.5,35.5],
    'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
    'state': false,
    'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
  })

  let muteButton = new Nexus.TextButton("#" + name + "-channel", { //create the mute button UI
    'size': [35.5,35.5],
      'alternateText': '<img src="./assets/icon-mute-white.svg" class="microphone-icon">',
  'state': false,
  'text': "<img src='./assets/icon-mute-gray.svg' class='" + name + "Mute microphone-icon'>"
  })

  let clear = new Nexus.TextButton ("#" + name + "-channel-clear", { //create the clear button ui
    'size': [35.5,35.5],
  'mode': 'aftertouch',
  'state': false,
  'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
  })


//create the label
  let label = new Nexus.TextButton ('#' + name + '-label', {
  'size': [100,35.5],
  'mode': 'aftertouch',
  'state': false,
  'text': '<div class="white-text">' + name + '</div>'
  })

  //**COLORS**
  soloButton.colorize("fill", "#364250")
  soloButton.colorize("accent", "#6DCADE")
  muteButton.colorize("fill", "#364250")
  muteButton.colorize("accent", "#6DCADE")
  clear.colorize("fill", "#364250")
  clear.colorize("accent", "#6DCADE")
  label.colorize("fill", "#4D5B6A")
  label.colorize("accent", "#6DCADE")

  //label click triggers playback
    label.on('change', function(v) {
      console.log(player)

      if (v == true) {
        player.start()
      }
    })


  //****SOCKET EMITTERS****

  soloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    console.log(player)

    player.solo = v;
    socket.emit(name+"Solo", v)

  })
  muteButton.on('change', function(v) { //activate the mute button
    console.log(player)
    player["mute"] = v;
    socket.emit(name + "Mute", v)
  })

  clear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(row, [0,0]) //HOW DOES THIS BECOME VARIABLE

  })

  //****SOCKET RECEIVERS****
  //mute
  socket.on(name +"Mute", function (toggle) {
    if (toggle != muteButton.state) {
      player.mute = toggle;
      muteButton.state = toggle;
    }
  })

//solo
  socket.on(name + "Solo", function(toggle) {
    if (toggle != solo.solo) {
    solo.solo = toggle;
    soloButton.state = toggle;
    }
  })


//SIGNAL CHAIN

player.chain(volume, solo, Tone.Master); //defines the signal flow


return {clear: clear, label: label, solo:solo,  muteButton:muteButton, soloButton: soloButton, volume: volume }
}


let cymChannel = Channel('cym', 0);
let perc1Channel = Channel('perc1', 1);
let perc2Channel = Channel('perc2', 2);
let tom1Channel = Channel('tom1', 3);
let tom2Channel = Channel('tom2', 4);
let hhChannel = Channel('hh', 5);
let snareChannel = Channel('snare', 6);
let kickChannel = Channel('kick', 7);

console.log("snare",snareChannel);
console.log("kick",kickChannel);
