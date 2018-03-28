
function Channel(name, row) {
let parent = this;
var div = document.getElementById('mixer');
  div.innerHTML += "<div class ='button-row d-flex flex-row'>"
+ "<div id='" + name + "-channel-clear' class ='" + name +"-channel d-flex flex-row'>"
+ "</div><div id='" + name +"-label' class='label'></div>"
  + "<div id='" + name + "-channel' class ='" + name + "-channel smButton d-flex flex-row'>"
  +"</div></div>";

  this.player = kitSounds.get(name);
  console.log(this.player)
  this.solo = new Tone.Solo();
  this.volume = new Tone.Volume([volume = -15 ]);
  this.soloButton = new Nexus.TextButton("#" + name + "-channel", {
    'size': [35.5,35.5],
      'alternateText': '<img src="./assets/icon-solo-white.svg" class="microphone-icon">',
  'state': false,
  'text': '<img src="./assets/icon-solo-gray.svg" class="microphone-icon">'
  } )

  this.muteButton = new Nexus.TextButton("#" + name + "-channel", { //create the mute button UI
    'size': [35.5,35.5],
      'alternateText': '<img src="./assets/icon-mute-white.svg" class="microphone-icon">',
  'state': false,
  'text': "<img src='./assets/icon-mute-gray.svg' class='" + name + "Mute microphone-icon'>"
  })

  this.clear = new Nexus.TextButton ("#" + name + "-channel-clear", { //create the clear button ui
    'size': [35.5,35.5],
  'mode': 'aftertouch',
  'state': false,
  'text': '<img src="./assets/icon-clear-gray.svg" class="microphone-icon">'
  })


//create the label
  this.label = new Nexus.TextButton ('#' + name + '-label', {
  'size': [100,35.5],
  'mode': 'aftertouch',
  'state': false,
  'text': '<div class="white-text">' + name + '</div>'
  })

  //**COLORS**
  this.soloButton.colorize("fill", "#364250")
  this.soloButton.colorize("accent", "#6DCADE")
  this.muteButton.colorize("fill", "#364250")
  this.muteButton.colorize("accent", "#6DCADE")
  this.clear.colorize("fill", "#364250")
  this.clear.colorize("accent", "#6DCADE")
  this.label.colorize("fill", "#4D5B6A")
  this.label.colorize("accent", "#6DCADE")

  //label click triggers playback
    this.label.on('change', function(v) {
      if (v == true) {
        parent.player.start();
      }
    })


  //****SOCKET EMITTERS****

  this.soloButton.on('change', function(v) { //activate the solo button -- REMOVE ALL PLAYERS TO MASTER
    console.log(this)

    parent.solo.solo = v;
    socket.emit(name+"Solo", v)

  })
  this.muteButton.on('change', function(v) { //activate the mute button
    parent.player.mute = v;
    socket.emit(name + "Mute", v)
  })

  this.clear.on('change', function(v) { //activate the clear button
    drums.matrix.populate.row(row, [0,0]) //HOW DOES THIS BECOME VARIABLE

  })

  //****SOCKET RECEIVERS****
  //mute
  socket.on(name +"Mute", function (toggle) {
    if (toggle != this.muteButton.state) {
      parent.player.mute = toggle;
      parent.muteButton.state = toggle;
    }
  })

//solo
  socket.on(name + "Solo", function(toggle) {
    if (toggle != this.solo.solo) {
    parent.solo.solo = toggle;
    parent.soloButton.state = toggle;
    }
  })


//SIGNAL CHAIN

  this.player.chain =(this.volume, this.solo, Tone.Master); //defines the signal flow

}
let cymChannel = new Channel('cym', 0);
let perc1Channel = new Channel('perc1', 1);
let perc2Channel = new Channel('perc2', 2);
let tom1Channel = new Channel('tom1', 3);
let tom2Channel = new Channel('tom2', 4);
let hhChannel = new Channel('hh', 5);
let snareChannel = new Channel('snare', 6);
let kickChannel = new Channel('kick', 7);
