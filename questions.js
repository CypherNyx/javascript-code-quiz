//******** Setup variables and quiz questions

var score = 0;
var container = document.querySelector('#container');
var quizContent = document.querySelector('#quizContent');
// var quizPrompt = document.querySelector('qPrompt')
var timer = document.querySelector('#timer');
var startButton = document.querySelector('#startButton');

var questions = [
  {
    prompt:`What is the output of the following code?
    console.log(typeof null);`,
    options:['string', 'number','object','null' ],
    answer:'null'
  },
  {
    prompt:'Which keyword is used to declare a constant variable?',
    options:['var','let','const', 'const var'],
    answer:'const'
  },
  /*{
    prompt:'What is the purpose of the `typeof` operator in JavaScript?',
    options:['To check if a variable is defined', 'To check the data type of a value', 'To compare two variables', 'To perform mathematical operations'  ],
    answer:'To check the data type of a value'
  },*/
  {
    prompt:'Which function is used to parse a string and return a floating-point number?',
    options:['parseInt','parseFloat', 'toFixed','Math.round' ],
    answer:'parseFloat'
  },
 /*{
    prompt:'Which of the following is NOT a valid way to declare a function in JavaScript?',
    options:[`function myFunction() {}`, `const myFunction = function() {}`, 'const myFunction = () => {}','let myFunction = {};'  ],
    answer:'let myFunction = {};'
  },*/
  {
    prompt:'What does the `===` operator do in JavaScript?',
    options:['Checks if two values are equal, including type comparison', 'Assigns a value to a variable', 'Compares two values without type comparison', 'Performs bitwise XOR operation'],
    answer:'Checks if two values are equal, including type comparison'
  },
  {
    prompt:'The "function" and " var" are known as:',
    options:['Keywords', 'Data types', 'Declaration statements', 'Prototypes' ],
    answer:'Declaration statements'
  },
 /* {
    prompt:'What is the purpose of the querySelector() method in JavaScript?',
    options:['To select and modify HTML elements', 'To execute a function repeatedly', 'To select an element based on its CSS class or ID', 'To add event listeners to elements'],
    answer:'To select an element based on its CSS class or ID'
  },*/
  {
    prompt:'How do you write a conditional statement in JavaScript?',
    options:['if-else statement', 'while loop', ' for loop', 'switch statement'],
    answer:'if-else statement'
  },
  {
    prompt:'A set of unordered properties that, has a name and value is called______',
    options:['String', 'Array','Serialized Object','Object'],
    answer:'Object'
  },
]

var questionIndex = 0;
var createUl = document.createElement('ul');
createUl.setAttribute('id','listedOptions');

var timeInterval = 0;
var countdown = 100;
var penalty = 10;

// ******** Start quiz

startButton.addEventListener('click', function(){
  if (timeInterval === 0){
    timeInterval = setInterval(function(){
      countdown--;
      timer.textContent = `Time: ${countdown}`;
      if (countdown <= 0){
        clearInterval(timeInterval);
        theEnd();
      }
    }, 1000);
  }
  newQuestion(questionIndex);

});

// ******** Generate New Question

function newQuestion(questionIndex){
    quizContent.innerHTML='';
    createUl.innerHTML = '';
    var displayQuestion = document.createElement('h2');
//this function builds the question to be displayed
    for (var i = 0; i < questions.length; i++) {
        displayQuestion.innerHTML = questions[questionIndex].prompt;
        var displayOptions = questions[questionIndex].options;
        quizContent.appendChild(displayQuestion);
    }
    console.log(displayOptions);
    displayOptions.forEach( function (newItem){
      var listItem = document.createElement('li');
      listItem.innerHTML += '<button>' + newItem + '</button>';
      quizContent.appendChild(createUl);
      createUl.appendChild(listItem);
      listItem.addEventListener('click', (checkAnswer));
    })

}

var i = 0;
var createDiv = document.createElement('div');
var feedback = document.createElement ('h3');
createDiv.setAttribute('id', 'createDiv');

// Right or Wrong. Show results of choice
function checkAnswer(event){
  var choice = event.target;
  var quizContChildren = quizContent.children
  console.log('children', quizContChildren)
  if (quizContChildren[2]) {
    console.log('it was here')
    quizContChildren[2].remove();
  }
  quizContent.appendChild(createDiv);
  createDiv.appendChild(feedback);
  var next = document.createElement('button');
  next.setAttribute('id', 'nextButton');
  next.textContent = 'Next Question';

  //Feedback for Right answer
  if (choice.textContent == questions[questionIndex].answer){
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
function continueQuiz(event){
  createDiv.innerHTML = '';
  questionIndex++;
  if (questionIndex >= questions.length){
    theEnd();
  } else {
    newQuestion(questionIndex);
  }
}

function theEnd () {
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

  var inputBox = document.createElement ('input');
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
  submit.addEventListener('click', function(){
    var initials = inputBox.value;
    
    if (initials === ''){
      console.log('No initials entered');
      alert('Please enter your initials');
    } else {
      var finalScore = {
        initials: initials,
        score: score
      }

      //Storing the past scores
      var savedScore = localStorage.getItem('savedScore');
  if ('savedScore === null') {
      savedScore = []; // ! why use this?
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

