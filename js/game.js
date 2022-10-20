let buttonColors = ['green', 'red', 'yellow', 'blue'];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;


$(document).keydown(() => {
    if (!started) {
        nextSequence();
        started = true;
    }
})

$('.btn').click(event => {
    let userChosenColor = event.target.id;

    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})


function nextSequence() {
    userClickedPattern = [];

    level++;
    $('#level-title').text('Level ' + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    animateSequence(randomChosenColor);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
        }

    } else {
        $('#level-title').text('Game Over, Press Any Key to Restart');
        playSound('wrong');
        $('body').addClass('game-over');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200)

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


function animateSequence(color) {
    $(`#${color}.btn`).fadeOut('fast').fadeIn('fast');
}

function animatePress(buttonColor) {
    let button = $(`#${buttonColor}`);

    button.addClass('pressed');

    setTimeout(() => {
        button.removeClass('pressed');
    }, 100)
}


function playSound(name) {
    let sound = new Audio(`audio/${name}.mp3`);
    sound.play();
}
