`use strict`;

const btnThemeToggle = document.querySelector(`.btn-theme-toggle`);
const themeCircle = document.querySelector(`.toggle-circle`);
const iconToggleArr = document.querySelectorAll(`.icon-toggle`);
const body = document.querySelector(`body`);
const subH = document.querySelector(`.sub-h`);
const quizTopicContainerArr = document.querySelectorAll(`.quiz-topic`);




btnThemeToggle.addEventListener(`click`, function() {
    themeCircle.classList.toggle(`toggle-circle--dark-mode`);
    iconToggleArr.forEach(el => el.classList.toggle(`display-none`));
    body.classList.toggle(`body--dark-mode`);
    subH.classList.toggle(`sub-h--dark-mode`);
    quizTopicContainerArr.forEach(el => el.classList.toggle(`quiz-topic--dark-mode`));
})

