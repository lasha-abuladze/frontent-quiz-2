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




let quizTopicName;
let quizData;
let questionsArr;

let questionIndex = 1;
// let questionsArr;

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

    console.log(quizTopicName)

    fetch(`./app/data.json`).then(res => res.json()).then(data => {

        /// get selected quiz
        data.quizzes.forEach(el => {
            if(el.title === quizTopicName) {
                quizData = el
            }
        })

        // questionsArr = quizData.questions;

        // console.log(questionsArr)

        console.log(quizData)


        //open quiz questions section

        // sectionArr.forEach(el => {
        //     if(!el.classList.contains(`display-none`)) {
        //         el.classList.add(`display-none`);
        //     }
        // })

        // sectionArr.forEach(el => {
        //     if(el.classList.contains(`section--question`)) {
        //         el.classList.remove(`display-none`);
        //     }
        // })


        //// udate question index ui
        
        // questionsTotalNumber.textContent = `${quizData.questions.length}`;
        // questionCurrentIndex.textContent = `${questionIndex}`;

        // //// update question
        // question.textContent = `${questionsArr[questionIndex - 1].question}`;

        // /// update progressBar 
        // progressBar.value = `${questionIndex}`;


        // /// update answers options

        // answersArr.forEach((el,i) => {
        //     el.textContent = `${questionsArr[questionIndex - 1].options[i]}`;
        // })





        // console.log(questionsArr)
        // console.log(quizData);
    })
    
})