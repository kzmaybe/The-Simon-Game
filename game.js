//Array that hold the squence of colors
    var buttonColors = ["red", "blue", "green", "yellow"];

//Array that hold the game pattern
    var gamePattern = [];

 //Array that hold the user click pattern
    var userClickedPattern = [];

// Level var
    var level=0;
    var started=false;

function nextSequence(){
    // Rest the user clicked pattern
    userClickedPattern = []
    
    //Change h1 to current game level
    level++;
    $("h1").text("Level " + level);
    
    //Generate a random number between 0 and 3
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    //Add the new randomChosenColour generated to the end of the gamePattern.
    gamePattern.push(randomChosenColor);

    //Animate the game pattern with delays
    for (var i = 0; i < gamePattern.length; i++) {
        (function(i) {
            setTimeout(function() {
                $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
                playSound(gamePattern[i]);
            }, i * 600); // Staggered delay for each color
        })(i);
    }
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}

function animatePress(currentColor){
    // Use jQuery to add this pressed class to the button that gets clicked
    // AND remove the pressed class after a 100 milliseconds.
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    }, "100");

}

$(document).keypress(function(){
    if(!started){
        started = true;
        nextSequence();
    }
});


// Wait until the user clicked a botton
    //detect when any of the buttons are clicked
    $(".btn").click(function (event){
        //var to store the id of the button got clicked
        var userChosenColor = $(this).attr("id");
        
        //Add the userChosenColor to the userClickedPattern
        userClickedPattern.push(userChosenColor);

        //Play sound
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length -1);
    });

function checkAnswer(currentLevel) {
    // Check if the current color matches the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // If the user pattern is correct, check if they completed the pattern
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence(); // Call nextSequence after a short delay
            }, 1000);
        }
    } else {
        // If the answer is wrong, trigger game over
        playSound("wrong");

        //Apply "game over" class to the body of the website
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, "200");

        //Change h1
        $("h1").text("Game Over, Press Any Key to Restart");

        // Reset the game variables
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    started = false; // The game is over, reset the started flag
    level = 0;
}

    
   
