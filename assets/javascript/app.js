
//Beginning code effect from CodePen
var Messenger = function (el) {
  'use strict';
  var m = this;

  m.init = function () {
    m.codeletters = "&#*+%?£@§$";
    m.message = 0;
    m.current_length = 0;
    m.fadeBuffer = false;
    m.messages = [
      "Welcome to Code Trivia",
      "This is a place to hone your Javascript knowledge",
      "This quiz tests your basic understanding of Javascript",
      "Let's begin"
    ];

    setTimeout(m.animateIn, 100);
  };

  m.generateRandomString = function (length) {
    var random_text = '';
    while (random_text.length < length) {
      random_text += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
    }

    return random_text;
  };

  m.animateIn = function () {
    if (m.current_length < m.messages[m.message].length) {
      m.current_length = m.current_length + 2;
      if (m.current_length > m.messages[m.message].length) {
        m.current_length = m.messages[m.message].length;
      }

      var message = m.generateRandomString(m.current_length);
      $(el).html(message);

      setTimeout(m.animateIn, 50);
    } else {
      setTimeout(m.animateFadeBuffer, 50);
    }
  };

  m.animateFadeBuffer = function () {
    if (m.fadeBuffer === false) {
      m.fadeBuffer = [];
      for (var i = 0; i < m.messages[m.message].length; i++) {
        m.fadeBuffer.push({
          c: (Math.floor(Math.random() * 12)) + 1,
          l: m.messages[m.message].charAt(i)
        });
      }
    }

    var do_cycles = false;
    var message = '';

    for (var i = 0; i < m.fadeBuffer.length; i++) {
      var fader = m.fadeBuffer[i];
      if (fader.c > 0) {
        do_cycles = true;
        fader.c--;
        message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
      } else {
        message += fader.l;
      }
    }

    $(el).html(message);

    if (do_cycles === true) {
      setTimeout(m.animateFadeBuffer, 50);
    } else {
      setTimeout(m.cycleText, 2000);
    }
  };

  m.cycleText = function () {
    m.message = m.message + 1;
    if (m.message >= m.messages.length) {
      m.message = 0;
    }

    m.current_length = 0;
    m.fadeBuffer = false;
    $(el).html('');

    setTimeout(m.animateIn, 200);
  };

  m.init();
}

console.clear();
var messenger = new Messenger($('#messenger'));

// Array of Object Qustion Bank
var triviaGame = [{
    question: "What is Javascript?",
    answerBank: [
      "It's a computing language that programs the behavior of the web page.",
      "It's a computing language that specifies the layout of the web page.",
      "It's an advanced technology given forth from an alien race.",
      "It's a computing language that defines the content of the web page.",
    ],
    answer: "4",
  },
  {
    question: "Which of the following is true for Javascript?",
    answerBank: [
      "Javascript can change HTML Content",
      "Javascript can change HTML Attributes",
      "Javascript can do Arithmetic",
      "All of the above",
    ],
    answer: "4",
  },
  {
    question: "For best practices for Javascript avoid:",
    answerBank: [
      "var",
      "==",
      "avoid concatenation",
      "using a lot of variables",
    ],
    answer: "2",
  },
  {
    question: "Which HTML element links our external Javascript file in?",
    answerBank: [
      "&lt;javascript&gt;",
      "&lt;js&gt;",
      "&lt;script&gt;",
      "&lt;javascript.js&gt;",
    ],
    answer: "3",
  },
  {
    question: "Which method takes the user's imput?",
    answerBank: [
      "none of them below",
      "prompt()",
      "takeData()",
      "userData()",
    ],
    answer: "2",
  },
  {
    question: "How do you create a function in Javascript?",
    answerBank: [
      "var functionName = function() {};",
      "function functionName() {};",
      "var functionName = x => x * 2;",
      "All of them Above",
    ],
    answer: "4",
  },
  {
    question: "Which Javascript method is not real?",
    answerBank: [
      "Math.cbrt()",
      "Math.cosh()",
      "Math.prime()",
      "Math.pow()",
    ],
    answer: "3",
  },
  {
    question: "The Math.floor() function ...",
    answerBank: [
      "returns the largest integer less than or equal to a given number",
      "rounds the number to the nearest integer",
      "places the integer on the floor",
      "is used to count the floors in sequential order",
    ],
    answer: "1",
  },
  {
    question: "Which of the following is true?",
    answerBank: [
      "There are only String and Array Methods in Javascript.",
      "Math.random() method returns a random integer.",
      "To reverse the order of the element in the array you will use .reverse()",
      "Functions cannot exist within another function",
    ],
    answer: "3",
  },
  {
    question: "What happens when you add a string '10' with the number 10 in Javascript?",
    answerBank: [
      "You will get '1010'.",
      "You will get 1010.",
      "You will get '20'.",
      "You will get 20.",
    ],
    answer: "1",
  }
];



$(document).ready(function () {

   
//This starts the trivia
  setTimeout(startTrivia, 15000);

  
//Hides the special effect 'messenger in the beginning, fades the quiz section of the hmlt and starts the game and timer. (this is a text timer I hide from display. The hidden timer is used to help create the circular timer display)
  function startTrivia() {
    $('#messenger').hide();
    $('.quiz').fadeIn("slow");
    // $('.timer').fadeIn("slow"); 
    gameStart();
    run();
    timers(); 
  };

  var btn = $("button");
  var buttonClicked = 0; 
  var choice1 = $(".answerChoice1");
  var choice2 = $(".answerChoice2");
  var choice3 = $(".answerChoice3");
  var choice4 = $(".answerChoice4");
  var questionSel = $(".question");
  var timer = $(".timer");
  var resultPage = $(".buttomRow");
  var questionCounter = 0;
  var correctAnswered = 0;
  var wrongGuesses = 0;
  var missedQuestion = 0; 
  var timeRemaining = 60;
  var time = 61; /* how long the timer will run (seconds) */
  var initialOffset = '440';
  var i = 60;
  var intervalId;
  var interval; 
  var correctPercent = ((correctAnswered / 10) * 100);

  //These are the functions to run the hidden text countdown, I left it since it has code that runs the app
  function run() {
    clearInterval(intervalId);
    timeRemaining = 60; 
    intervalId = setInterval(decrement, 1000);
  };


  function decrement() {

    timeRemaining--;


    $(timer).html("<p>Time Remaining: " + timeRemaining + "</p>");

    if (timeRemaining === 0) {
      timeRemaining = 60; 
      stop();

      var choiceString = ".answerChoice" + triviaGame[questionCounter].answer;
      $(choiceString).css("background-color", "green"); 
      missedQuestion++
      setTimeout(function() {
        nextQuestion(); 
      }, 2000); 
    }
  };

  //  The stop function
  function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
  };

  //Runs the timers, appends the variables to the display
  function gameStart() {
    run();
    timers(); 
    $(questionSel).append(triviaGame[questionCounter].question);
    $(choice1).append(triviaGame[questionCounter].answerBank[0]);
    $(choice2).append(triviaGame[questionCounter].answerBank[1]);
    $(choice3).append(triviaGame[questionCounter].answerBank[2]);
    $(choice4).append(triviaGame[questionCounter].answerBank[3]);
  };
  

  $("button").on("click", function checkQuestion() {
    buttonClicked++; 
    if ($(this).val() === triviaGame[questionCounter].answer) {
      $(this).css("background-color", "green");
      correctAnswered++;
      stop(); 
      timeStop(); 
      btn = $('button');
      btn.prop('disabled', true);
      setTimeout(function () {
        nextQuestion();
        run(); 
        timers(); 
        btn.prop('disabled', false);
      }, 2000);
    } else {
      $(this).css("background-color", "red");
      wrongGuesses++;
    }
  });

  //For that slight text animation when you hover over each button
  $("button").hover(function () {
    $(this).animate({
      "font-size": "22px"
    }, 400);
  }, function () {
    $(this).animate({
      "font-size": "20px"
    }, 400)
  });

  function nextQuestion() {
    questionSel.empty();
    choice1.empty();
    choice2.empty();
    choice3.empty();
    choice4.empty();
    questionCounter++;
    if (questionCounter === 9) {
      stop(); 
      timeStop(); 
      questionCounter = 0;
      $(timer).hide(); 
      $(questionSel).hide(); 
      $("button").hide(); 
      $(resultPage).fadeIn("slow"); 
      showResult(); 
    }
    $("button").css("background-color", "black");
    gameStart();
  };

  function showResult() {

    timeStop();
    correctPercent = (((correctAnswered) / buttonClicked) * 100);
    $(".time").hide(); 
    $(".percentCorrect").append("<h1 style='color: green; text-align: center;'>" + correctPercent.toFixed(2) + "%</h1>");
    $(".wrongGuesses").append("<h1 style='color: lightred; text-align: center;'> Number of wrong guesses :" + wrongGuesses + "</h1>");
    $(".missedQuestions").append("<h1 style='color: white; text-align: center;'> Number of missed questions :" + missedQuestion + "</h1>");
  };

  function timers() { 
    clearInterval(interval);
    time = 61; /* how long the timer will run (seconds) */
    initialOffset = '440';
    i = 60;
    interval = setInterval(decrement1, 1000); 
    $('.circle_animation').css('stroke-dashoffset', initialOffset-(1*(initialOffset/time)));
  };

  
    /* Need initial run as interval hasn't yet occured... */
  
  function decrement1() {
    i--; 
    $('h2').text(i);

    if (i == 0) {  	
      clearInterval(interval);
    }
    
    $('.circle_animation').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/time)));

  };

  function timeStop() {
    clearInterval(interval);
  };

});