/* Filter on mobile*/
const sideBarToggleBtn = document.querySelector('.menu-icon-wrapper')
const menuIcon = document.querySelector('.menu-icon')
const sideBar = document.querySelector('.sidebar')


//Клик по кнопке для показа фильтра и изменения иконки

sideBarToggleBtn.onclick = function () {
    menuIcon.classList.toggle('menu-icon-active');
    sideBar.classList.toggle('sidebar--mobile-active');

};
