// UI SETUP =====================================
//-----------------------------------------------
var pianoDimensions = [500, 125]
var pianoUI = new Nexus.Piano('#piano', {
    'size': pianoDimensions,
    'mode': 'button',
    'lowNote': 24,
    'highNote': 60
});

pianoUI.on('change', function(v) {
    console.log(v);
});

$('#piano').css('transform','rotate(-90deg) translate(-37%, -150%');
console.log($('#piano').width());
console.log($('#piano').height());

//TODO make resizable
$('#piRollGrid').height(498);
$('#piRollGrid').width(400);
$('#piRollGrid').css('transform', 'translate(125px, -125px)');
//Build rows
var keys = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
var startingOctave = 3;
for (var i = 0; i < (60-24) ; i++) {
    if (keys[i % keys.length]) {
        div = '<div class="black-row grid-row" id="'+ notes[i % 12] + (startingOctave + Math.floor(i /12)) +  '"></div>'
        $('#piRollGrid').prepend(div)
    }  else {
        div = '<div class="white-row grid-row" id="'+ notes[i % 12] + (startingOctave + Math.floor(i /12))  + '"></div>'
        $('#piRollGrid').prepend(div)
    }
}

function buildColumns(num) {
    for (var i = 0; i < 8*num; i++) {
        $('.grid-row').append('<div class="grid-column" id="'+ i + '"></div>');
    }
}
buildColumns(1);
//Build Grid Columns
function listener(v) {
    var draggie = $(this).data('draggabilly');
    console.log( v.target.offsetLeft, draggie.position.x, draggie.position.y );
    v.stopPropagation();
}

var halfButton = new Nexus.TextButton('#2n', {
    'size': [120, 40],
    'text': '1/2',
    'state': false,
    'alternateText': '1/2'
});
var quarterButton = new Nexus.TextButton('#4n', {
    'size': [120, 40],
    'text': '1/4',
    'state': true,
    'alternateText': '1/4'
});
var eighthButton = new Nexus.TextButton('#8n', {
    'size': [120, 40],
    'text': '1/8',
    'state': false,
    'alternateText': '1/8'
});
var sixteenthButton = new Nexus.TextButton('#16n', {
    'size': [120, 40],
    'text': '1/16',
    'state': false,
    'alternateText': '1/16'
});

var pianoClear = new Nexus.TextButton('#pianoClear', {
    'size': [200, 40],
    'text': 'Clear',
    'state': false,
});


// Button Colorize

halfButton.colorize("fill", "#364250")
halfButton.colorize("accent", "#8ADBED")

quarterButton.colorize("fill", "#364250")
quarterButton.colorize("accent", "#8ADBED")

eighthButton.colorize("fill", "#364250")
eighthButton.colorize("accent", "#8ADBED")

sixteenthButton.colorize("fill", "#364250")
sixteenthButton.colorize("accent", "#8ADBED")

pianoClear.colorize("fill", "#364250")
pianoClear.colorize("accent", "#8ADBED")

halfButton.on('change', function(v) {
    if (v) {
        eighthButton.turnOff();
        quarterButton.turnOff();
        sixteenthButton.turnOff();
        noteSize = 100;
        noteLength = "2n"
        $('.grid-row').empty();
        buildColumns(0.5);
    }
});

eighthButton.on('change', function(v) {
    if (v) {
        halfButton.turnOff();
        quarterButton.turnOff();
        sixteenthButton.turnOff();
        noteLength = "8n"
        var draggies = $('.grid-column').contents();
        noteSize = 25;
        $('.grid-row').empty();
        buildColumns(2);
        //$('.grid-column').replaceWith(draggies);

    }
});

sixteenthButton.on('change', function(v) {
    if (v) {
        halfButton.turnOff();
        quarterButton.turnOff();
        eighthButton.turnOff();
        noteLength = "16n"
        var draggies = $('.grid-column').contents();
        noteSize = 25/2;
        $('.grid-row').empty();
        buildColumns(4);
        //$('.grid-column').replaceWith(draggies);

    }
});

quarterButton.on('change', function(v) {
    if (v) {
        eighthButton.turnOff();
        halfButton.turnOff();
        sixteenthButton.turnOff();
        noteLength = "4n"
        noteSize = 50;
        $('.grid-row').empty();
        buildColumns(1);
    }
});

//clear button actions
pianoClear.on('change', function(v) {
  if (v) {
    pianoPart.removeAll();
    $('.draggable').remove();
  }
})

var noteLength = "4n"
var noteSize = 50;

var rowHeight = $('.grid-row').height();
var columnWidth = $('.grid-column').height();

// TONE SETUP ===================================
//-----------------------------------------------

var piano = new Tone.MonoSynth({
    "oscillator": {
        "type": "fmsquare5",
		"modulationType" : "triangle",
      	"modulationIndex" : 2,
      	"harmonicity" : 0.501
    },
    "filter": {
        "Q": 1,
        "type": "lowpass",
        "rolloff": -24
    },
    "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.4,
        "release": 2
    },
    "filterEnvelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.8,
        "release": 1.5,
        "baseFrequency": 50,
        "octaves": 4.4
    }
}).toMaster();

var pianoPart = new Tone.Part(function(time, value){
    piano.triggerAttackRelease(value.note, value.length, time);
}).start();
pianoPart.loop = true;
pianoPart.loopEnd = "2m";

//create volume slider UI
var pianoSlider = new Nexus.Slider('#pianoVolume', {
    'size': [240, 15],
    'min': -60,
    'max': 10,
    'mode': 'absolute',
    'step': 1,
    'value': -15
});

pianoSlider.colorize("accent", "#8ADBED")
pianoSlider.colorize("fill", "#364250")

//link slider to Volume
pianoSlider.on('change', function(v) {
  piano.volume.value = v;
})




//Handle placing new notes
//TODO Fix the event propagation issue - possible solution with listening to different event besides click
$('.grid-row').on('click','.grid-column', function(v) {
    console.log(v.target.offsetLeft);
    var note = v.target.parentElement.id
    var div = $('<div class="draggable"></div>');
    $(this).append(div)
        div.draggabilly({axis: 'x', containment: '.grid-row'});
    div.on('pointerDown dragStart dragMove dragEnd staticClick', listener);
    console.log(div.position());

    //TODO Make resizable
    //var margin = parseInt($('.synth-view').css('marginLeft'));
    //console.log('div position', div.position().left - 125 - margin);
    if ( noteLength === "4n") {
        var startTime = Math.floor((v.target.offsetLeft) / 50);
        startTime = "0:" + (startTime);

    } else if (noteLength === "8n") {
        var startTime = Math.floor((v.target.offsetLeft) / 25);
        startTime = "0:0:" + ((startTime)*2);

    } else if (noteLength === "16n") {
        var startTime = Math.floor((v.target.offsetLeft) / 12);
        startTime = startTime > 22 ? startTime -1 : startTime;
        startTime = "0:0:" + startTime;

    } else if (noteLength === "2n") {
        var startTime = Math.floor((v.target.offsetLeft) / 100);
        startTime = "0:" + ((startTime));
    }

    console.log(startTime, note);
    piano.triggerAttackRelease(note, "8n", 0);
    pianoPart.add({time: startTime, note: note, length: noteLength});

});




//Tone.Transport.start();
