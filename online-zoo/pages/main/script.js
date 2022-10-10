// const iconMenu = document.querySelector('.menu__icon');
//     const menuBody = document.querySelector('.navbar');
//     iconMenu.addEventListener("click", function (e){
//         iconMenu.classList.toggle('active');
//         menuBody.classList.toggle('active');
//     });

alert("Здравствуйте. Не могли ли бы вы перенести проверку на последний день кросс-чека. В данный момент всё активно доделываю. Спасибо :) ")

function showMenuList(){
    document.querySelector('.navbar').classList.toggle('active');
    document.querySelector('.menu__icon').classList.toggle('active');
}

let items = document.querySelectorAll('.card-container');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n){
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction){
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
    })
}

function showItem(direction){
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function () {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function previousItem(n){
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n){
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right')
}

document.querySelector('.arrow-buttons.left').addEventListener('click', function (){
    if(isEnabled){
        previousItem(currentItem);
    }
})

document.querySelector('.arrow-buttons.right').addEventListener('click', function (){
    if(isEnabled){
        nextItem(currentItem);
    }
})