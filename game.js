
  var buttonColours = ["red", "blue", "green", "yellow"];

  var gamePattern = [];
  var userClickedPattern = [];

  var level = 0;
  var started = false;

  $(window).keypress(function() {
    if (!started) {
      $('#level-title').text('Level ' + level);
      nextSequence();
      started = true;
    }
  });

  $('.btn').click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    pressed(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });



  function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').html('Level ' + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }


  function playSound(randomChosenColour) {
    var audio = new Audio("sounds/"+ randomChosenColour + ".mp3");
    audio.play();
  }

  function pressed(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }

  function gameOver(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

      startOver();
  }

  function startOver(){
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    started = false;
  }

  function checkAnswer(currentLevel){
      if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      }else{
        gameOver();
        console.log("lose");
    }
  }
