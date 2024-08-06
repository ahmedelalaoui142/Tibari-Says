var buttonColours =  ["red","blue","green","yellow"];
var gamePattern= [];
var userClickPattern=[];
var level=0;
function playSound(name) {
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}
var firstTimePress= true;
$(document).keydown(function(event){
    if (firstTimePress) {
        nextSequence();
        firstTimePress= false;
        $("#level-title").text("Level " + level)
    } 
})

function animatePress(currentColor) {

    
    $("#" + currentColor).addClass("pressed");
  
    
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
  
function nextSequence() {
    userClickPattern = [];
    var r = Math.random() * 4;
    var randomNumber = Math.floor(r);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).animate({ opacity: 0.2 }, 200).animate({ opacity: 1.0 }, 200)
    playSound(randomChosenColour);
    level += 1
    $("#level-title").text("Level " + level)
};

$(".btn").click(function(){
    
    var userChosenColour=$(this).attr("id") ;
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level-1);
    
    
})


function startOver() {
    level = 0;
    gamePattern = [];
    userClickPattern = [];
}

function checkAnswer(currentLevel) {
    if (userClickPattern.length == level) {
        if (userClickPattern[currentLevel] == gamePattern[currentLevel] ) {
            console.log("success");
            setTimeout(nextSequence,1000);
        } else {
            console.log("wrong");
            $('body').addClass("game-over");
            setTimeout(function () {
                $('body').removeClass("game-over");
            }, 200);
            $('h1').text('Game Over, Press Any Key to Restart');
            playSound('wrong');
            startOver(); 
            firstTimePress= true;
            
            
        }
        
    }
}
