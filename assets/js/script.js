//******** Setup variables and quiz questions

var score = 0;
var container = document.querySelector('#container');
var quizContent = document.querySelector('#quizContent');
// var quizPrompt = document.querySelector('qPrompt')
var timer = document.querySelector('#timer');
var startButton = document.querySelector('#startButton');

var questions = [
  {
    prompt: 'What is the purpose of JavaScript in web development?',
    options: ['To define styles for web pages', 'To create database tables', 'To structure the layout of web pages', 'To add interactivity and functionality to web pages'],
    answer: 'To add interactivity and functionality to web pages'
  },
  {
    prompt: `What is the primary function of the if statement in JavaScript?`,
    options: ['Declare a function', 'Create a loop', 'Control the flow of code based on a condition', 'Define an array'],
    answer: 'Control the flow of code based on a condition'
  },
  {
    prompt: 'How do you create a function in JavaScript?',
    options: ['Using the def keyword', 'With function keyword', 'By typing new function()', 'With script tag'],
    answer: 'With function keyword'
  },
  {
    prompt: 'What does the console.log() method do?',
    options: ['Calculate mathematical expressions', 'Display messages in the browser console', 'Create an HTML form', 'Add an event listener'],
    answer: 'Display messages in the browser console'
  },
  {
    prompt: 'What is a variable in JavaScript?',
    options: ['A function declaration', 'A form input', 'A named container for storing data', 'A type of loop'],
    answer: 'A named container for storing data'
  },
  {
    prompt: 'What is the role of the for loop in JavaScript?',
    options: ['To define a function', 'To include a library', 'To iterate over a block of code a specified number of times', 'To display a message box'],
    answer: 'To iterate over a block of code a specified number of times'
  },
  {
    prompt: 'What is the DOM in web development?',
    options: ['A web browser', 'A web development framework', 'A web programming language', 'The Document Object Model representing a webpage'],
    answer: 'The Document Object Model representing a webpage'
  },
  {
    prompt: "What's the purpose of the addEventListener() method?",
    options: ['To add two numbers together', 'To create a new element', 'To attach an event handler function to an HTML element', 'To define a constant'],
    answer: 'To attach an event handler function to an HTML element'
  },
  {
    prompt: "What's the purpose of the switch statement in JavaScript?",
    options: ['To compare two variables', 'To define a new function', 'To execute a block of code based on different cases', 'To display a popup message'],
    answer: 'To execute a block of code based on different cases'
  },
  {
    prompt: 'How do you comment out multiple lines in JavaScript?',
    options: ['Using /* and */ to enclose the comment', 'With // at the start of each line', 'By using <comment> tags', 'Using ** to mark comments'],
    answer: 'Using /* and */ to enclose the comment'
  }

]

var questionIndex = 0;
var createUl = document.createElement('ul');
createUl.setAttribute('id', 'listedOptions');

var timeInterval = 0;
var countdown = 100;
var penalty = 10;

// ******** Start quiz

startButton.addEventListener('click', function () {
  if (timeInterval === 0) {
    timeInterval = setInterval(function () {
      countdown--;
      timer.textContent = `Time: ${countdown}`;
      if (countdown <= 0) {
        clearInterval(timeInterval);
        theEnd();
      }
    }, 1000);
  }
  newQuestion(questionIndex);

});

// ******** Generate New Question

function newQuestion(questionIndex) {
  quizContent.innerHTML = '';
  createUl.innerHTML = '';
  var displayQuestion = document.createElement('h2');
  //this function builds the question to be displayed
  for (var i = 0; i < questions.length; i++) {
    displayQuestion.innerHTML = questions[questionIndex].prompt;
    var displayOptions = questions[questionIndex].options;
    quizContent.appendChild(displayQuestion);
  }
  console.log(displayOptions);
  displayOptions.forEach(function (newItem) {
    var listItem = document.createElement('li');
    listItem.innerHTML += '<button>' + newItem + '</button>';
    quizContent.appendChild(createUl);
    createUl.appendChild(listItem);
    listItem.addEventListener('click', (checkAnswer));
  })

}

var i = 0;
var createDiv = document.createElement('div');
var feedback = document.createElement('h3');
createDiv.setAttribute('id', 'createDiv');

// Right or Wrong. Show results of choice
function checkAnswer(event) {
  var choice = event.target;
  createDiv.innerHTML = '';

  quizContent.appendChild(createDiv);
  createDiv.appendChild(feedback);
  var next = document.createElement('button');
  next.setAttribute('id', 'nextButton');
  next.textContent = 'Next Question';

  //Feedback for Right answer
  if (choice.textContent == questions[questionIndex].answer) {
    score++;
    feedback.textContent = `✅ That's Right! Yay!!!`;
    createDiv.appendChild(feedback);

    createDiv.appendChild(next);
    next.addEventListener('click', (continueQuiz));
  } else {
    //Feedback for Wrong answer
    countdown = countdown - penalty;
    feedback.textContent = `🚫 Wrong answer, Try again!!`
    createDiv.appendChild(feedback);
  }

}

// this function determines wether it's time to end the game or continue to the next question
function continueQuiz(event) {
  createDiv.innerHTML = '';
  questionIndex++;
  if (questionIndex >= questions.length) {
    theEnd();
  } else {
    newQuestion(questionIndex);
  }
}

function theEnd() {
  quizContent.innerHTML = '';
  timer.innerHTML = '';
  // set up highscore page
  var newTitle = document.createElement('h1');
  newTitle.setAttribute('id', 'newTitle');
  newTitle.textContent = 'Finished!';
  quizContent.appendChild(newTitle);

  // calculate final score
  if (countdown >= 0) {
    score = countdown;
    clearInterval(timeInterval);
    var resultsP = document.createElement('p');
    resultsP.textContent = `Your final score is: ${score}`
    quizContent.appendChild(resultsP);
  } else {
    score = 0;
    var outOfTime = document.createElement('h2');
    outOfTime.textContent = `Time is up! 🕔`;
    quizContent.appendChild(outOfTime);
    var resultsP = document.createElement('p');
    resultsP.textContent = `Your final score is: ${score}`
    quizContent.appendChild(resultsP);
  }

  //Submit Initials and save Score

  var initialsPrompt = document.createElement('label');
  initialsPrompt.setAttribute('for', 'inputBox');
  initialsPrompt.textContent = 'Enter your initials: ';
  quizContent.appendChild(initialsPrompt);

  var inputBox = document.createElement('input');
  inputBox.setAttribute('type', 'Text');
  inputBox.setAttribute('id', 'inputBox');
  inputBox.textContent = '';
  quizContent.appendChild(inputBox);

  var submit = document.createElement('button');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('id', 'submit');
  submit.textContent = 'submit';
  quizContent.appendChild(submit);

  //Event listener to submit and store initials and score
  submit.addEventListener('click', function () {
    var initials = inputBox.value;

    if (initials === '') {
      console.log('No initials entered');
      alert('Please enter your initials');
    } else {
      var finalScore = {
        initials: initials,
        score: score
      }

      //Storing the past scores
      var savedScore = localStorage.getItem('savedScore');
      if (savedScore === null) {
        savedScore = [];
      } else {
        savedScore = JSON.parse(savedScore);
      }
      savedScore.push(finalScore);
      var newScore = JSON.stringify(savedScore);
      localStorage.setItem('savedScore', newScore);
      window.location.replace('high-scores.html');
    }

  });


};

