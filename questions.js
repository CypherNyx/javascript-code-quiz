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
  {
    prompt:'What is the purpose of the `typeof` operator in JavaScript?',
    options:['To check if a variable is defined', 'To check the data type of a value', 'To compare two variables', 'To perform mathematical operations'  ],
    answer:'To check the data type of a value'
  },
  {
    prompt:'Which function is used to parse a string and return a floating-point number?',
    options:['parseInt','parseFloat', 'toFixed','Math.round' ],
    answer:'parseFloat'
  },
  {
    prompt:'Which of the following is NOT a valid way to declare a function in JavaScript?',
    options:[`function myFunction() {}`, `const myFunction = function() {}`, 'const myFunction = () => {}','let myFunction = {};'  ],
    answer:'let myFunction = {};'
  },
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
  {
    prompt:'What is the purpose of the querySelector() method in JavaScript?',
    options:['To select and modify HTML elements', 'To execute a function repeatedly', 'To select an element based on its CSS class or ID', 'To add event listeners to elements'],
    answer:'To select an element based on its CSS class or ID'
  },
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
