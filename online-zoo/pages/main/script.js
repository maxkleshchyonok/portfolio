// const iconMenu = document.querySelector('.menu__icon');
//     const menuBody = document.querySelector('.navbar');
//     iconMenu.addEventListener("click", function (e){
//         iconMenu.classList.toggle('active');
//         menuBody.classList.toggle('active');
//     });

// alert("Здравствуйте. Не могли ли бы вы перенести проверку на последний день кросс-чека. В данный момент всё активно доделываю. Спасибо :) ")

function showMenuList(){
    document.querySelector('.navbar').classList.toggle('active');
    document.querySelector('.menu__icon').classList.toggle('active');
}

// let items = document.querySelectorAll('.cards');
// let currentItem = 0;
// let isEnabled = true;
//
// function changeCurrentItem(n){
//     currentItem = (n + items.length) % items.length;
// }
//
// function hideItem(direction){
//     isEnabled = false;
//     items[currentItem].classList.add(direction);
//     items[currentItem].addEventListener('animationend', function () {
//         this.classList.remove('active', direction);
//     })
// }
//
// function showItem(direction){
//     items[currentItem].classList.add('next', direction);
//     items[currentItem].addEventListener('animationend', function () {
//         this.classList.remove('next', direction);
//         this.classList.add('active');
//         isEnabled = true;
//     })
// }
//
// function previousItem(n){
//     hideItem('to-right');
//     changeCurrentItem(n - 1);
//     showItem('from-left');
// }
//
// function nextItem(n){
//     hideItem('to-left');
//     changeCurrentItem(n + 1);
//     showItem('from-right')
// }
//
// document.querySelector('.arrow-buttons.left').addEventListener('click', function (){
//     if(isEnabled){
//         previousItem(currentItem);
//     }
// })
//
// document.getElementById('button-right').addEventListener('click', function () {
//     alert('it works')
// })
//
// document.querySelector('.arrow-buttons.right').addEventListener('click', function (){
//     if(isEnabled){
//         nextItem(currentItem);
//     }
// })

function changeCards() {
    let parent = document.querySelector('.slide-cards');
    let child = parent.querySelectorAll('.cards')
    console.log(child)
    // for(let i=0;i<child.length;i++){
    //     if(child[i].classList.contains('active')){
    //         child[i].classList.remove('active')
    //         child[i+1].classList.remove('active')
    //     } else{
    //         child[i].classList.add('active');
    //         child[i-1].classList.remove('active')
    //     }
    //     if(i===3){
    //         i=0
    //     }
    // }
    for(let elem of child){
        if(elem.classList.contains('active')){
            elem.classList.remove('active')
        } else elem.classList.add('active')
    }
}



window.onload = function () {
    document.getElementById('amountChoice').onclick = function () {
        document.getElementById('amount-field').value = this.value
    }
    document.getElementById('amountChoice1').onclick = function () {
        document.getElementById('amount-field').value = this.value
    }
    document.getElementById('amountChoice2').onclick = function () {
        document.getElementById('amount-field').value = this.value
    }
    document.getElementById('amountChoice3').onclick = function () {
        document.getElementById('amount-field').value = this.value
    }
    document.getElementById('amountChoice4').onclick = function () {
        document.getElementById('amount-field').value = this.value
    }
    document.getElementById('amountChoice5').onclick = function () {
        document.getElementById('amount-field').value = this.value
    }
    document.getElementById('amountChoice6').onclick = function () {
        document.getElementById('amount-field').value = this.value
    }
    document.getElementById('amountChoice7').onclick = function () {
        document.getElementById('amount-field').value = this.value
    }
}





