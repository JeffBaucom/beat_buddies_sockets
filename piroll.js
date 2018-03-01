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

$('#piRollGrid').height(499);
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

//Build Grid Columns
for (var i = 0; i < 4; i++) {
    $('.grid-row').append('<div class="grid-column" id="'+ i + '"></div>');
}
function listener(v) {
    var draggie = $(this).data('draggabilly');
    console.log( v.target.offsetLeft, draggie.position.x, draggie.position.y );
    v.stopPropagation();
}

var rowHeight = $('.grid-row').height();
var columnWidth = $('.grid-column').height();

// TONE SETUP ===================================
//-----------------------------------------------

var piano = new Tone.Synth().toMaster();

var pianoPart = new Tone.Part(function(time, note){
    piano.triggerAttackRelease(note, "4n", time);
}).start();
pianoPart.loop = true;
pianoPart.loopEnd = "1m";


$('.grid-column').on('click', function(v) { 
    var note = v.target.parentElement.id
    var div = $('<div class="draggable"></div>');
    $(this).append(div)
        div.draggabilly({axis: 'x', containment: '.grid-row'});
    div.on('pointerDown dragStart dragMove dragEnd staticClick', listener);
    var startTime = Math.floor(div.position().left / 100);
    startTime = "0:" + (startTime -1);
    console.log(startTime, note);
    piano.triggerAttackRelease(note, "8n", 0);
    pianoPart.add(startTime, note);

});

//Tone.Transport.start();
