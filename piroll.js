var pianoDimensions = [500, 125]
var piano = new Nexus.Piano('#piano', {
    'size': pianoDimensions,
    'mode': 'button',
    'lowNote': 24,
    'highNote': 60
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
for (var i = 0; i < (60-24) ; i++) {
    if (keys[i % keys.length]) {
        div = '<div class="black-row grid-row" id="'+ i + '"></div>'
        $('#piRollGrid').prepend(div)
    }  else {
        div = '<div class="white-row grid-row" id="'+ i + '"></div>'
        $('#piRollGrid').prepend(div)
    }
}

for (var i = 0; i < 4; i++) {
    $('.grid-row').append('<div class="grid-column" id="'+ i + '"></div>');
}

$('.grid-column').on('click', function(v) { 
    console.log(v.target.parentElement.id) 
    var div = $('<div class="draggable"></div>');
    $(this).append(div)
        div.draggabilly({axis: 'x', containment: '.grid-row'});
});

var rowHeight = $('.grid-row').height();
var columnWidth = $('.grid-column').height();



