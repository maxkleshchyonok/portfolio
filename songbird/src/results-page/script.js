let result = localStorage.getItem('score');
let button = document.querySelector('.exit-button');
document.querySelector('.score-amount').textContent = result;

if(result === '30'){
    document.querySelector('.button_inner').textContent = 'Exit';
} else {
    document.querySelector('.button_inner').textContent = 'Try again';
}

button.addEventListener('click', ()=>{
    if(result === '30'){
        window.location.href = '../start-page/index.html';
    } else {
        window.location.href = '../quiz-page/index.html';
    }
})