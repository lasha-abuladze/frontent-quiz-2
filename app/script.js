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




class AppQuiz {

    #quizTopicName;
    #quizData;
    #questionsArr;
    #questionIndex = 1;
    #answerContainer;
    #selectedAnswer;
    #correctAnswer;
    #finalScore = 0;

    constructor(){
        this.#themeToggle();
        this.#displayQuiz();
        this.#submitAnswer();
        this.#displayNextQuestion();
        this.#playAgain();
    }

    //// theme toggle function
    #themeToggle() {
        btnThemeToggle.addEventListener(`click`, function() {
            themeCircle.classList.toggle(`toggle-circle--dark-mode`);
            iconToggleArr.forEach(el => el.classList.toggle(`display-none`));
            body.classList.toggle(`style-dark-mode`);
        })
    }


    /// main function to get a data and display quiz
    #displayQuiz() {

        quizList.addEventListener(`click`, (e) => {

            if(e.target.closest(`.quiz-topic`)) {
                const quizTopicContainer = e.target.closest(`.quiz-topic`);
                if(!quizTopicContainer) return;
                this.#quizTopicName = quizTopicContainer.querySelector(`.quiz-topic--name`).textContent;
            }

            this.#getQuizData();
            this.#getSelectedAnswer();
            this.#hideSection();
            this.#opensection(`section--question`);
        })
    }

    ///  get quiz data
    #getQuizData() {

        fetch(`./app/data.json`).then(res => res.json()).then(data => {
            this.#getSelectedQuizData(data);
        })
    }

    // get selected quiz 
    #getSelectedQuizData(data) {

        data.quizzes.forEach(el => {
            if(el.title === this.#quizTopicName) {
                this.#quizData = el;
            }
        })

        this.#questionsArr = this.#quizData.questions;
        this.#updateQuestionUI();
        this.#updateOptionsList();
    }

    #updateQuestionUI() {
        questionsTotalNumber.textContent = `${this.#quizData.questions.length}`;
        questionCurrentIndex.textContent = `${this.#questionIndex}`;
        question.textContent = `${this.#questionsArr[this.#questionIndex - 1].question}`;
        progressBar.value = `${this.#questionIndex}`;
    }

    #updateOptionsList() {
        answersArr.forEach((el,i) => {
            el.textContent = `${this.#questionsArr[this.#questionIndex - 1].options[i]}`;
        })
    }
    
    #getSelectedAnswer() {
        answersListContainer.addEventListener(`click`, (e) => {
            if(e.target.closest(`.label--inp-radio`)) {
                this.#answerContainer = e.target.closest(`.label--inp-radio`);

                if (!this.#answerContainer || e.target.tagName === 'INPUT') {
                    return;
                }

                this.#selectedAnswer = this.#answerContainer.querySelector(`.answer`).textContent;
            }
        })
    }

    #submitAnswer() {
        btnsubmitAnswer.addEventListener(`click`, (e) => {
            e.preventDefault();

            this.#correctAnswer = this.#questionsArr[this.#questionIndex - 1].answer;

            if(!this.#selectedAnswer) {
                alert(`You should select answer`);
            } else {

                if(this.#selectedAnswer === this.#correctAnswer) {

                    this.#answerContainer.classList.add(`label--inp-radio--correct`);
                    this.#answerContainer.querySelector(`.icon-correct`).classList.remove(`display-none`);
                    this.#answerContainer.querySelector(`.inp-radio`).classList.add(`inp-radio--correct`);

                    this.#updateFormState();

                    this.#finalScore++;
                }

                if(this.#selectedAnswer !== this.#correctAnswer) {
                    this.#answerContainer.classList.add(`label--inp-radio--wrong`);
                    this.#answerContainer.querySelector(`.icon-error`).classList.remove(`display-none`);
                    this.#answerContainer.querySelector(`.inp-radio`).classList.add(`inp-radio--wrong`);

                    this.#updateFormState();

                    answersArr.forEach((el, i) => {
                        if(el.textContent === this.#correctAnswer) {
                            answerLabels[i].querySelector(`.icon-correct`).classList.remove(`display-none`);
                        }
                    })
                }
            }
        })
    }

    #displayNextQuestion() {

        btnNextQuestion.addEventListener(`click`, (e) => {
            e.preventDefault();

            if(this.#questionIndex < this.#questionsArr.length) {

                this.#questionIndex++;
                this.#selectedAnswer = ``;

                this.#updateQuestionUI();
                this.#updateOptionsList();
                this.#resetLabels();
                this.#toggleFormBtns();

            } else {
                this.#hideSection();
                this.#opensection(`section--quiz-completed`);

                finalScoreHTML.textContent = `${this.#finalScore}`;

                const quizLogoLink = this.#quizData.icon;
                const imgContainer = document.querySelector(`.img-container`);
                quizLogo.src = `${quizLogoLink}`;
                quizName.textContent = this.#quizData.title;

                if(this.#quizData.title === `HTML`) {
                    imgContainer.style.backgroundColor = `#FFF5ED`;
                } else if(this.#quizData.title === `CSS`) {
                    imgContainer.style.backgroundColor = `#E0FDEF`;
                } else if(this.#quizData.title === `Javascript`) {
                    imgContainer.style.backgroundColor = `#EBF0FF`;
                } else if(this.#quizData.title === `Accessibility`) {
                    imgContainer.style.backgroundColor = `#F6E7FF`;
                }
            }
        })
    }

    #playAgain() {
        btnPlayAgain.addEventListener(`click`, (e) => {
            e.preventDefault();
            this.#questionIndex = 1;
            this.#finalScore = 0;

            this.#hideSection();
            this.#opensection(`section--start-menu`);
            this.#resetLabels();
            this.#toggleFormBtns();
        })
    }
    
    /// update input behavior and form buttons.
    #updateFormState() {
        inpRadioArr.forEach(el => el.disabled = true);
        this.#toggleFormBtns();
    }

    #toggleFormBtns() {
        formBtns.forEach(el => el.classList.toggle(`display-none`));
    }

    #resetLabels() {
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

        iconsCheckedAnswers.forEach(el => {
            if(!el.classList.contains(`display-none`)) {
                el.classList.add(`display-none`)
            }
        })

        this.#resetInputs();

    }

    #resetInputs() {
        inpRadioArr.forEach(el => el.checked = false);
        inpRadioArr.forEach(el => el.disabled = false);

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
    }

    #hideSection() {
        sectionArr.forEach(el => {
            if(!el.classList.contains(`display-none`)) {
                el.classList.add(`display-none`);
            }
        })
    }

    #opensection(sectionClassName) {
        sectionArr.forEach(el => {
            if(el.classList.contains(`${sectionClassName}`)) {
                el.classList.remove(`display-none`);
            }
        })
    }

}

const quiz = new AppQuiz();