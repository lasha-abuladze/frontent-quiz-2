`use strict`;

const btnThemeToggle = document.querySelector(`.btn-theme-toggle`);
const themeCircle = document.querySelector(`.toggle-circle`);
const iconToggleArr = document.querySelectorAll(`.icon-toggle`);
const body = document.querySelector(`body`);


const quizList = document.querySelector(`.quiz-topics-list`);
const sectionArr = document.querySelectorAll(`.section`);
const questionsTotalNumber = document.querySelector(`.total-count`);
const questionCurrentIndex = document.querySelector(`.current-index`);
const question = document.querySelector(`.question`);
const progressBar = document.querySelector(`#quiz-progress`);
const answersArr = document.querySelectorAll(`.answer`);


const formBtns = document.querySelectorAll(`.btn--form`);
const btnsubmitAnswer = document.querySelector(`.btn--submit-answer`);
const btnNextQuestion = document.querySelector(`.btn--next-question`);

const answersListContainer = document.querySelector(`.answers-list`);
const answerLabels = document.querySelectorAll(`.label--inp-radio`);
const iconsCheckedAnswers = document.querySelectorAll(`.icon-checked`);
const inpRadioArr = document.querySelectorAll(`.inp-radio`);


let quizTopicName;
let quizData;
let questionsArr;

let questionIndex = 1;
let answerContainer;
let chosenAnswer;
let correctAnswer;

////  theme toggle
btnThemeToggle.addEventListener(`click`, function() {
    themeCircle.classList.toggle(`toggle-circle--dark-mode`);
    iconToggleArr.forEach(el => el.classList.toggle(`display-none`));
    body.classList.toggle(`style-dark-mode`);
})




quizList.addEventListener(`click`, function(e) {

    // /// get selected quiz name
    if(e.target.closest(`.quiz-topic`)) {
        const quizTopicContainer = e.target.closest(`.quiz-topic`);
        quizTopicName = quizTopicContainer.querySelector(`.quiz-topic--name`).textContent;
    }

    fetch(`./app/data.json`).then(res => res.json()).then(data => {

        /// get selected quiz
        data.quizzes.forEach(el => {
            if(el.title === quizTopicName) {
                quizData = el
            }
        })

        questionsArr = quizData.questions;


        //open quiz questions section

        sectionArr.forEach(el => {
            if(!el.classList.contains(`display-none`)) {
                el.classList.add(`display-none`);
            }
        })

        sectionArr.forEach(el => {
            if(el.classList.contains(`section--question`)) {
                el.classList.remove(`display-none`);
            }
        })


        // //// udate question index ui
        
        questionsTotalNumber.textContent = `${quizData.questions.length}`;
        questionCurrentIndex.textContent = `${questionIndex}`;

        // update question
        question.textContent = `${questionsArr[questionIndex - 1].question}`;

        /// update progressBar 
        progressBar.value = `${questionIndex}`;


        /// update answers options

        answersArr.forEach((el,i) => {
            el.textContent = `${questionsArr[questionIndex - 1].options[i]}`;
        })

        correctAnswer = questionsArr[questionIndex - 1].answer;





        console.log(questionsArr)
        // console.log(quizData);
    })
    
})


answersListContainer.addEventListener(`click`, function(e) {

    if(e.target.closest(`.label--inp-radio`)) {
        answerContainer = e.target.closest(`.label--inp-radio`);
        chosenAnswer = answerContainer.querySelector(`.answer`).textContent;

        if (!answerContainer || e.target.tagName === 'INPUT') {
            return;
        }
    }

})


btnsubmitAnswer.addEventListener(`click`, function(e) {
    e.preventDefault();

    if(!chosenAnswer) alert(`you shood chose answer`);

    if(chosenAnswer === correctAnswer) {
        answerContainer.style.border = `3px solid #2FD887`;
        answerContainer.querySelector(`.icon-correct`).classList.remove(`display-none`);
        answerContainer.querySelector(`.inp-radio`).classList.add(`inp-radio--correct`);
        inpRadioArr.forEach(el => el.disabled = true)
        formBtns.forEach(el => el.classList.toggle(`display-none`));

    }

    if(chosenAnswer !== correctAnswer) {
        answerContainer.style.border = `3px solid #EE5454`;
        answerContainer.querySelector(`.icon-error`).classList.remove(`display-none`);
        answerContainer.querySelector(`.inp-radio`).classList.add(`inp-radio--wrong`);
        inpRadioArr.forEach(el => el.disabled = true);
        formBtns.forEach(el => el.classList.toggle(`display-none`));


        answersArr.forEach((el, i) => {
            if(el.textContent === correctAnswer) {
                answerLabels[i].querySelector(`.icon-correct`).classList.remove(`display-none`);
            }
        })
    }



})

