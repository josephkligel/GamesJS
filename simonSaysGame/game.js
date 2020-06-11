const buttonColors = ['red', 'blue', 'green', 'yellow']
const gamePattern = []
let userClickedPattern = []
let gameStarted = false;
let level = 0;
const levelTitle = document.getElementById('level-title');

function playSound(name){
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor){
  currentColor.classList.add('pressed');
  setTimeout(() => {
    currentColor.classList.remove('pressed')
  }, 100)
}

function nextSequence(){
  levelTitle.innerHTML = `Level ${++level}`;
  userClickedPattern = []
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  const btn = $(`#${randomChosenColor}`)
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$('.btn').click(function(){
  let userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(this);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    new Audio('sounds/wrong.mp3').play()
    levelTitle.innerHTML = 'Game Over. Press any key to restart.';
    document.body.classList.add('game-over');
    setTimeout(() => {
      document.body.classList.remove('game-over');
    }, 200);
    document.onkeypress = () => {
      location.reload();
    }
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

document.onkeypress = () => {
  if(!gameStarted){
    levelTitle.innerHTML = `Level ${level}`;
    nextSequence();
    gameStarted = true;
  }
};
