var buttonColors = ["red","blue","green","yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
    
})

$("#start-continue").on("click",function(){
  if (started != true){
  nextSequence()
  $("#start-continue").addClass("hidden");
  
  $("#level-title").text("Level " + level)
  started = true
}
})

function nextSequence() {
  userClickedPattern = []
  level ++;
  $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    
     $("#" + randomChosenColour).fadeIn(1000).fadeOut(1000).fadeIn(1000)
        playSound(randomChosenColour)

    }
  

  function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()

  }

  function animatePress(currentColor){
      $("#" + currentColor).addClass("pressed")
      setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
      },500)

      
  }

  function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("Success")
      if(userClickedPattern.length ===gamePattern.length){
        setTimeout(nextSequence(), 5000);
      }
      
  }
  else{startOver()
}

function startOver(){
  console.log("Wrong")
  var wrongAnswer = new Audio("sounds/wrong.mp3")
  wrongAnswer.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
  },200)
  $("#level-title").text("Game Over, Press continue to restart")
  $("#start-continue").removeClass("hidden");
  $("#start-continue").text("Continue")
  level = 0
  gamePattern = []
  started = false 
  
  }
}