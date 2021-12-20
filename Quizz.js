//select all elements using js
const start = document.getElementById("start"); 
const quizz = document.getElementById("quizz");
const question = document.getElementById("question");
const imgQuest = document.getElementById("imgQuest");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress"); 
const scoreDiv = document.getElementById("scoreContainer");

//create my questions
let questions = [
     {
        question:"What is my biggest fear?",
        imgSrc:"imgs/fear.jpg",
        choiceA:"loss",
        choiceB:"failure",
        choiceC:"darkness",
        choiceD:"being judged",
        correct:"A" 
    },
    {
        question:"What is my favorite color?",
        imgSrc:"imgs/colors.jpg",
        choiceA:"black",
        choiceB:"red",
        choiceC:"white",
        choiceD:"blue",
        correct:"B" 
    },
    {
        question:"What is my favorite season?",
        imgSrc:"imgs/seasons.jpg",
        choiceA:"winter",
        choiceB:"autumn",
        choiceC:"spring",
        choiceD:"summer",
        correct:"D" 
    },
   
    {
        question:"What is my favorite food",
        imgSrc:"imgs/food.jpg",
        choiceA:"tajine",
        choiceB:"couscous",
        choiceC:"bestilla",
        choiceD:"seffa",
        correct:"C" 
    }
];

//create variables
const lastQuest = questions.length-1;
let runningQuest = 0;
let count = 0;
const questionTime = 30; //30 sec
const gaugeWidth = 300; //300px
const gaugeUnit = gaugeWidth/questionTime;
let timer;
let score = 0;

//render a question
function renderQuest(){
    let q = questions[runningQuest];

    question.innerHTML = "<p>"+ q.question +"</p>";
    imgQuest.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB; 
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;   
}

start.addEventListener("click",startQuizz);

//start quizz
function startQuizz(){
start.style.display = "none";
renderQuest();
quizz.style.display = "block";
renderProg();
renderCount();
timer = setInterval(renderCount,1000); //we're gonna call renderCount() every 1sec(1000ms)
}

//render progeress
function renderProg(){
    for(let qIndex=0; qIndex<=lastQuest; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>"
    }
}

//render counter
function renderCount(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit +"px";
        count++;
    }
    else{
        count = 0;
        //change color of proggress to red  
        wrongAnswer();
        if(runningQuest < lastQuest ){
            runningQuest++;
            renderQuest();
       }
       else{
           //end the quizz and show the score
           clearInterval(timer);
           renderScore();
       }
    }
}

//check answer
function checkAnswer(answer){
    if(answer == questions[runningQuest].correct){
        //correct answer
        score++;
        //change color of proggress to green
        correctAnswer();
    }
    else{
        //wrong answer
        //change color of proggress to red  
        wrongAnswer();
    }
    count = 0;
    if(runningQuest < lastQuest ){
         runningQuest++;
         renderQuest();
    }
    else{
        //end the quizz and show the score
        clearInterval(timer);
        renderScore();
    }
}

//correct answer
function correctAnswer(){
    document.getElementById(runningQuest).style.backgroundColor = "green";
}

//wrong answer
function wrongAnswer(){
    document.getElementById(runningQuest).style.backgroundColor = "red";
}

//render score
function renderScore(){
    scoreDiv.style.display = "block";
    //calculate the sum of question percent answerd
    const scorePercent = Math.round(100*score/questions.length);
    //choose an image based on the scorePercent
    let img = (scorePercent >= 80) ? "imgs/5.png" :
              (scorePercent >= 60) ? "imgs/4.png" :
              (scorePercent >= 40) ? "imgs/3.png" :
              (scorePercent >= 20) ? "imgs/2.png" : "imgs/1.png";
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePercent +"%</p>";         

}