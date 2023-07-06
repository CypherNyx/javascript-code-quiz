var ScoreBoard = document.querySelector('#quizContent');
var ScoreRank = document.querySelector('#showAllScores');
var backBtn = document.querySelector('#backBtnn');
var resetBtn = document.querySelector('#fullReset');

backBtn.addEventListener('click', function() {
  location.replace('index.html');
});

resetBtn.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
});

var savedScore = localStorage.getItem('savedScore');
savedScore = JSON.parse(savedScore);

if (savedScore !== null ) {
  for (var i = 0; i < savedScore.length; i++) {
    var addScore = document.createElement('li');
    addScore.setAttribute('id', 'scoreLi');
    addScore.textContent = savedScore[i].initials + ' ' + savedScore[i].score;

    ScoreRank.appendChild(addScore);
  }
};