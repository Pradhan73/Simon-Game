var buttonColours = ["blue","green","red","yellow"];

var gamepath = [];
var currpath = [];

var start = false;
var level = 0;

$(document).keypress(function() {
  if(!start){
    gamePathUpdate();
    start = true;
    $("h1").text("Level" + " " + level);
  }
});

$(".btn").click(function(){
  var color = $(this).attr("id");
  currpath.push(color);
  press(color);
  playSound(color);
  checkifcorrect(currpath.length - 1);
});

function checkifcorrect(index) {
  if(gamepath[index] === currpath[index]){
    if(gamepath.length === currpath.length){
      setTimeout(function(){
        gamePathUpdate();
      },1000);
    }
  }
  else{
    playWrong();
    startAgain();
  }

}

function gamePathUpdate(){
  currpath = [];
  level++;
  $("#level-title").text("Level" + " " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamepath.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function press(color){
  $("#" + color).addClass("pressed");
  setTimeout(function(){
    $("#" + color).removeClass("pressed");
  },100);
}

function playWrong(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $("#level-title").text("GAME OVER,Press Any Key To Restart Game");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },1000);
}

function startAgain(){
   //refresh the page to start a new game

  $(document).keypress(function(){
    location.reload(true);
  });
  // gamepath = [];
  // level = 0;
  // start = false;
}
