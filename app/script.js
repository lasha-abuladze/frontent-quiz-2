`use strict`;

const btnThemeToggle = document.querySelector(`.btn-theme-toggle`);
const themeCircle = document.querySelector(`.toggle-circle`);
const iconToggleArr = document.querySelectorAll(`.icon-toggle`);
const body = document.querySelector(`body`);




btnThemeToggle.addEventListener(`click`, function() {
    themeCircle.classList.toggle(`toggle-circle--dark-mode`);
    iconToggleArr.forEach(el => el.classList.toggle(`display-none`));
    body.classList.toggle(`style-dark-mode`);
})

