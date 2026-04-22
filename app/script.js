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

const finalScoreHTML = document.querySelector(`.final-scroe`);
const quizLogo = document.querySelector(`.quiz-logo`);
const quizName = document.querySelector(`.quiz-name`);
const btnPlayAgain = document.querySelector(`.btn--play-again`);



let quizTopicName;
let quizData;
let questionsArr;

let questionIndex = 1;
let answerContainer;
let chosenAnswer;
let correctAnswer;

let finalScore = 0;

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

        console.log(quizData.icon);
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

    if(!chosenAnswer) {

     alert(`you shood chose answer`)

    } else {
        if(chosenAnswer === correctAnswer) {
            answerContainer.classList.add(`label--inp-radio--correct`);
            answerContainer.querySelector(`.icon-correct`).classList.remove(`display-none`);
            answerContainer.querySelector(`.inp-radio`).classList.add(`inp-radio--correct`);
            inpRadioArr.forEach(el => el.disabled = true)
            formBtns.forEach(el => el.classList.toggle(`display-none`));
            finalScore++;

        }

        if(chosenAnswer !== correctAnswer) {
            answerContainer.classList.add(`label--inp-radio--wrong`);
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
    }



})


btnNextQuestion.addEventListener(`click`, function(e) {
    e.preventDefault();
    
    if((questionIndex) < quizData.questions.length) {

        questionIndex++;
        chosenAnswer = ``;

        question.textContent = `${questionsArr[questionIndex - 1].question}`;
        questionCurrentIndex.textContent = `${questionIndex}`;
        progressBar.value = `${questionIndex}`;


        answersArr.forEach((el,i) => {
            el.textContent = `${questionsArr[questionIndex - 1].options[i]}`;
        })


        correctAnswer = questionsArr[questionIndex - 1].answer;



        answerLabels.forEach(el => {
            if(el.classList.contains(`label--inp-radio--correct`)) {
                el.classList.remove(`label--inp-radio--correct`);
            }
        })

        answerLabels.forEach(el => {
            if(el.classList.contains(`label--inp-radio--wrong`)) {
                el.classList.remove(`label--inp-radio--wrong`);
            }
        })



        inpRadioArr.forEach(el => el.checked = false);
        inpRadioArr.forEach(el => el.disabled = false);
        iconsCheckedAnswers.forEach(el => {
            if(!el.classList.contains(`display-none`)) {
                el.classList.add(`display-none`)
            }
        })

        inpRadioArr.forEach(el => {
            if(el.classList.contains(`inp-radio--wrong`)) {
                el.classList.remove(`inp-radio--wrong`)
            }
        })

        inpRadioArr.forEach(el => {
            if(el.classList.contains(`inp-radio--correct`)) {
                el.classList.remove(`inp-radio--correct`)
            }
        })

        formBtns.forEach(el => el.classList.toggle(`display-none`));

    } else {

        sectionArr.forEach(el => {
            if(!el.classList.contains(`display-none`)) {
                el.classList.add(`display-none`);
            }
        });

        sectionArr.forEach(el => {
            if(el.classList.contains(`section--quiz-completed`)) {
                el.classList.remove(`display-none`);
            }
        })

        finalScoreHTML.textContent = `${finalScore}`;

        const quizLogoLink = quizData.icon;
        const imgContainer = document.querySelector(`.img-container`);
        quizLogo.src = `${quizLogoLink}`;
        quizName.textContent = quizData.title;

        if(quizData.title === `HTML`) {
            imgContainer.style.backgroundColor = `#FFF5ED`;
        } else if(quizData.title === `CSS`) {
            imgContainer.style.backgroundColor = `#E0FDEF`;
        } else if(quizData.title === `Javascript`) {
            imgContainer.style.backgroundColor = `#EBF0FF`;
        } else if(quizData.title === `Accessibility`) {
            imgContainer.style.backgroundColor = `#F6E7FF`;
        }

    }

})

btnPlayAgain.addEventListener(`click`, function(e) {
    e.preventDefault();

    questionIndex = 1;
    finalScore = 0;

    sectionArr.forEach(el => {
        if(!el.classList.contains(`display-none`)) {
            el.classList.add(`display-none`);
        }
    });

    sectionArr.forEach(el => {
        if(el.classList.contains(`section--start-menu`)) {
            el.classList.remove(`display-none`);
        }
    })

    inpRadioArr.forEach(el => {
        if(el.classList.contains(`inp-radio--wrong`)) {
            el.classList.remove(`inp-radio--wrong`)
        }
    })

    inpRadioArr.forEach(el => {
        if(el.classList.contains(`inp-radio--correct`)) {
            el.classList.remove(`inp-radio--correct`)
        }
    })

    iconsCheckedAnswers.forEach(el => {
        if(!el.classList.contains(`display-none`)) {
            el.classList.add(`display-none`)
        }
    })

    answerLabels.forEach(el => {
        if(el.classList.contains(`label--inp-radio--correct`)) {
            el.classList.remove(`label--inp-radio--correct`);
        }
    })

    answerLabels.forEach(el => {
        if(el.classList.contains(`label--inp-radio--wrong`)) {
            el.classList.remove(`label--inp-radio--wrong`);
        }
    })

    inpRadioArr.forEach(el => el.checked = false);
    inpRadioArr.forEach(el => el.disabled = false);
    formBtns.forEach(el => el.classList.toggle(`display-none`));
})




