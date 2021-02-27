//Start Section
let start = document.querySelector("#start");

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choice Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 30;
let interval = 0;

//total points
let correct = 0;

//stores Answer Value
let UserAns = undefined;

//action when 'Start' Button is Clicked
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//action when 'Exit' Button is Clicked
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});


//Creates Timer For Quiz Timer Section

let countDown = () => {
    // if (timer === 20) {
    //     clearInterval(interval);
    //     next_question.click();
    // } else {
    timer--;
    time.innerText = timer;
    // }
}


//setInterval(countDown,1000);

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    //    timer start
    // timer = 0;
}

let resetGame=()=>{
    index = 0;
    timer = 30;
    interval = 0;

}
loadData();

//action when 'Continue' Button is clicked
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    //    remove All Active Classes When Continue Button is clicked

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    total_correct.innerHTML = `${correct = 0} Out Of ${MCQS.length} Questions`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === MCQS[index].answer) {
            correct++;
        } else {
            timer -= 2
            // correct += 0;
        }
        //stop Counter
        clearInterval(interval);

        //disables All Options When User Selects An Option
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

////action when 'Next' Button is clicked
next_question.addEventListener("click", () => {
    //    if index is less then MCQS.length
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;


        //action when Quiz Questions are Complete; Displays Result Section
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

//action when 'Quit' Button is clicked
quit.addEventListener("click", () => {
    start.style.display = "block";
    result.style.display = "none";
});

//Action to start again When 'Start Again' Button is clicked
startAgain.addEventListener("click", () => {
    guide.style.display = "block";
    result.style.display = "none";
    resetGame()
});
