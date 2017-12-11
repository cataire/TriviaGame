$("document").ready(function() {


//Variables

var getValue;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var seconds = 30;
var interval;
var currentQuestion;
var currentIndex = 0;


var randomGifs = ['<img src="assets/images/daenerys_fire.gif">', "assets/images/joffrey_clapping.gif",
"assets/images/john_cold.gif", "assets/images/john_flying.gif", "assets/images/daenerys_dragons.gif"];
var sounds = {
buttonClick: new Audio("assets/sounds/multimedia_button_click_026.mp3"),
GOTtheme: new Audio("assets/sounds/GOTTheme.mp3"),
};


var question1 = {
question: "What does everybody call the leader of white walkers?" ,
answers: ["Mr President", "The chief", "Night King", "Ugly face"],
rightAnswer: "Night King",
questionGif: '<br><br><img src="assets/images/white-walker.gif">',
rightAnswerGif: '<br><img src="assets/images/night_king.gif">',
wrongAnswerGif: '<br><img src="assets/images/night_king.gif1">',
};

var question2 = {
question: 'What "donat" means in Dothraki language?',
answers: ["And eat your horse", "Round sweet pastry", "I want to kill you", "To shout"],
rightAnswer: "To shout",
questionGif: '<br><img src="assets/images/khal_drogo2.gif">',
rightAnswerGif: '<br><img src="assets/images/khal.gif">',
wrongAnswerGif: '<br><img src="assets/images/khal.gif>',

};



var question3 = {
question: "What killed Joffrey Baratheon?",
answers: ["His love to people", "Poison", "He ate too much", "Old age"],
rightAnswer: "Poison",
questionGif: '<br><img src="assets/images/joffrey_poisoned.gif">',
rightAnswerGif: '<br><img src="assets/images/joffrey_dying.gif">',
wrongAnswerGif: '<br><img src="assets/images/joffrey_clapping.gif>',

};

var question4 = {
question: "How old was Daenerys when she married Khal Drogo?",
answers: ["21", "18", "13", "Too young"],
rightAnswer: "13",
questionGif: '<br><img src="assets/images/khal_daenerys.gif">',
rightAnswerGif: '<br><img src="assets/images/daenerys_wed.gif">',
wrongAnswerGif: '<br><img src="assets/images/daenerys_wed.gif>',

};

var question5 = {
question: 'Why Daenerys is called "Mother of Dragons?"',
answers: ["She is really a dragon", "She found three little dragons", "She just made up this name to be cool", "She went into the fire with three dragon eggs"],
rightAnswer: "She went into the fire with three dragon eggs",
questionGif: '<br><<img src="assets/images/my_dragons.gif">',
rightAnswerGif: '<br><img src="assets/images/daenerys_dragons.gif">',
wrongAnswerGif: '<br><img src="assets/images/daenerys_fire.gif>',

};

var questionsArray = [question1, question2, question3, question4, question5];

//Functions

function runTimer() {
	interval = setInterval(decrement, 1000);
};

function decrement() {
seconds--;

$(".timer").html("Time left: " + seconds);

timeIsUp();

};


function timerStop() {

clearInterval(interval);

};


function endGame(){

			timerStop();
			$(".timer").empty();	
			screenUpdate();
			$(".question").empty();
			$(".btn").remove();
			let startOverBtn =  $("<btn>");
			startOverBtn.addClass("startOver btn");
			startOverBtn.text("Start Over");
			$(".question").html("Game over!<br>Do you want to try once more?");
			$(".question").append('<br><br><img src="assets/images/joffrey_clapping.gif">');
			$(".row1").append(startOverBtn);
			
			$(".startOver").click(function(){

				correctAnswers = 0;
				incorrectAnswers = 0;
				unanswered = 0;
				screenUpdate();
				startGame(questionsArray, 0);
			});

};


function startGame(questions, index) 

{
	console.log(index);
	seconds = 30;
	$(".row1").empty();
	runTimer();



	currentQuestion = questions[index];
	currentIndex = index;

	$(".question").html(currentQuestion.question + currentQuestion.questionGif);

	for (var i = 0; i < currentQuestion.answers.length; i++) 
	{

		var createBtns = $("<button>");
		createBtns.addClass("btn choice btn-choice btn-group");
		createBtns.attr("value", currentQuestion.answers[i]);
		createBtns.text(currentQuestion.answers[i]);
		$(".question").after(createBtns);
		screenUpdate();

	};


	

	$(".choice").click(function() {
		sounds.buttonClick.play();
		getValue = $(this).attr("value");

		console.log(getValue);
		console.log(currentQuestion.rightAnswer);

		if (getValue === currentQuestion.rightAnswer) {

			timerStop();
			$(".timer").empty();
			correctAnswers++;
			currentIndex++;
			screenUpdate();
			$(".question").empty();
			$(".btn").remove();
			$(".question").html("You're right! <br>" + currentQuestion.rightAnswerGif);
		}

		if (getValue !== currentQuestion.rightAnswer) {

			incorrectAnswers++;
			currentIndex++;
			timerStop();
			$(".timer").empty();	
			screenUpdate();
			$(".question").empty();
			$(".btn").remove();
			$(".question").html("No!"  + "<br> Of course it is "
			 + currentQuestion.rightAnswer + "<br>"
			 + currentQuestion.rightAnswerGif);

		}	



		setTimeout(function(){

			if (index < questions.length-1) {

				timerStop()
				seconds = 30;
				startGame(questions, ++index);
			}

			else {

				endGame();

			}

		}, 8000);

	});


};


function timeIsUp() {

	if (seconds === 0) {
	var randomGif = $("<img>");
	randomGif.attr("src", randomGifs[Math.floor(Math.random()*randomGifs.length)]);
	$(".question").html(randomGif);
	unanswered++;
	timerStop()
	currentIndex++;
	screenUpdate();
	$(".question").empty();
	$(".btn").remove();
	$(".question").html("Time is up! Try to just guess next time! <br> The right answer is: " + currentQuestion.rightAnswer);

	setTimeout(function(){
	startGame(questionsArray, currentIndex);

	if (currentIndex === questionsArray.length-1) {
		endGame();
	};

	}, 6000);

	
	

}
};


$(".start").click(function(){
sounds.buttonClick.play();
startGame(questionsArray, 0);

});

function screenUpdate() {

$(".correctIncorrect").html("Correct answers: " + correctAnswers + "<br> Wrong answers: " + incorrectAnswers + 
	"<br>Unanswered: " + unanswered);
};







});