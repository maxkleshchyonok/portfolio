

const iconMenu = document.querySelector('.menu__icon');
    const menuBody = document.querySelector('.navbar');
    iconMenu.addEventListener("click", function (e){
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    });