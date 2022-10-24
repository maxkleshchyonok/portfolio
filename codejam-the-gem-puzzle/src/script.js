const puzzle = document.getElementById('puzzle');
const puzzleBlocks = Array.from(puzzle.querySelectorAll('.puzzle-block'));
const countItems8 = 16;


let active = false;
let gameTimeNumbers = '';


function startTimer() {
    if (active) {
        let timer = document.getElementById('timer-numbers').innerHTML;
        let arr = timer.split(':')
        let minutes = arr[0];
        let seconds = arr[1];
        let hundredths = arr[2];
        if (hundredths == 99) {
            if (seconds == 59) {
                minutes++;
                seconds = 0;
                if (minutes < 10) minutes = "0" + minutes;
            } else {
                seconds++;
            }
            if (seconds < 10) seconds = "0" + seconds;
            hundredths = 0;
        } else {
            hundredths++;
            if(hundredths < 10) hundredths = "0" + hundredths
        }
        document.getElementById('timer-numbers').innerHTML = minutes + ":" + seconds + ":" + hundredths;
        gameTimeNumbers = minutes + ":" + seconds + ":" + hundredths;
        setTimeout(startTimer, 10);
    }
}

function changeState() {
    if(active == false){
        active = true;
        startTimer();
        console.log('timer has been started')
    } else{
        active = false;
    }
}


let moves = 0;
function countMoves() {
    if(active){
        moves++;
        document.getElementById('moves-number').innerHTML = '' + moves;
    }
}




let timer;
const shuffledClassName = 'blocked';
document.getElementById('play').addEventListener('click', () => {
    if(active){
        changeState();
    }
    document.getElementById('timer-numbers').innerHTML = '00:00:00';
    document.getElementById('moves-number').innerHTML = "0";
    // randomSwap(matrix);
    // setPositionItems(matrix);
    let shuffleCount = 0;
    clearInterval(timer);
    puzzle.classList.add(shuffledClassName);
    if(shuffleCount === 0){
        timer = setInterval(()=>{
            randomSwap(matrix);
            setPositionItems(matrix);
            shuffleCount += 1;
            if(shuffleCount >= 100){
                puzzle.classList.remove(shuffledClassName);
                clearInterval(timer);
                changeState();
            }
        }, 0);
    }
})



let matrix = getMatrix(
    puzzleBlocks.map((item) => Number(item.dataset.matrixId))
);
setPositionItems(matrix)

function getMatrix(arr) {
    const matrix = [[], [], [], []];
    let x = 0;
    let y = 0;
    for(let i=0; i<arr.length; i++){
        if(x >= 4){
            y += 1;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x += 1;
    }
    return matrix
}

puzzleBlocks[countItems8 - 1].style.display = 'none';

function setPositionItems(matrix) {
    for(let y=0; y<matrix.length; y++){
        for (let x=0; x<matrix[y].length; x++){
            const value = matrix[y][x];
            const node = puzzleBlocks[value - 1];
            setNodeStyles(node, x, y)
        }
    }
}

function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

// document.getElementById('play').addEventListener('click', () => {
//     const shuffledArray = shuffleArray(matrix.flat());
//     matrix = getMatrix(shuffledArray);
//     setPositionItems(matrix);
// })

function shuffleArray(arr) {
    return arr
    .map(value => ({value, sort: Math.random() }))
        .sort((a,b) => a.sort - b.sort)
        .map(({value}) => value)
}

const blankNumber = 16;

puzzle.addEventListener('click', (event) => {
    const buttonNode = event.target.closest('button')
    if(!buttonNode){
        return;
    }
    const buttonNumber = Number(buttonNode.dataset.matrixId);
    const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
    const isValid = isValidForSwap(buttonCoords, blankCoords);
    if(isValid){
        swap(blankCoords, buttonCoords, matrix);
        setPositionItems(matrix);
        countMoves()
    }


})

function findCoordinatesByNumber(number, matrix) {
    for (let y=0; y<matrix.length;y++){
        for (let x=0; x<matrix[y].length;x++){
            if(matrix[y][x] === number){
                return {x,y};
            }
        }
    }
}

function isValidForSwap(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x);
    const diffY = Math.abs(coords1.y - coords2.y);
    return (diffX === 1 || diffY===1) && (coords1.x === coords2.x || coords1.y === coords2.y);
}

function swap(coords1, coords2, matrix) {
    const coords1Number = matrix[coords1.y][coords1.x];
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = coords1Number;
    if(isWin(matrix)){
        addWinClass();
    }
}

function randomSwap(matrix) {
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
    const validCoords = findValidCoords({
        blankCoords,matrix, blockedCoords
    });
    const swapCoords = validCoords[
            Math.floor(Math.random()*validCoords.length)
        ];
    swap(blankCoords,swapCoords,matrix);
    blockedCoords = blankCoords;
}

function findValidCoords({blankCoords, matrix, blockedCoords}) {
    const validCoords = [];
    for (let y=0; y<matrix.length;y++){
        for (let x=0; x<matrix[y].length;x++) {
            if(isValidForSwap({x, y}, blankCoords)){
                if(!blockedCoords || !(blockedCoords.x ===x && blockedCoords.y === y)) {
                    validCoords.push({x, y});
                }
            }
        }
    }
    return validCoords;
}

let blockedCoords = null;

const winFlatArr = new Array(16).fill(0).map((item, i) => i + 1);

console.log(gameTimeNumbers)

function isWin(matrix) {
    const flatMatrix = matrix.flat();
    for (let i=0; i<winFlatArr.length; i++){
        if (flatMatrix[i] !== winFlatArr[i]){
            return false;
        }
    }
    localStorage.setItem("" + moves, gameTimeNumbers);
    resultsArray.push(localStorage.getItem('' + moves))
    active = false;
    return true;
}

const winClass = 'win'

function addWinClass() {
    setTimeout(() => {
        puzzle.classList.add(winClass)
    },200);
    setTimeout(() => {
        puzzle.classList.remove(winClass)
    },2000);
}

const openPopUp = document.getElementById('open-pop-up');
const closePopUp = document.getElementById('pop-up-close');
const popUp = document.getElementById('pop-up');

openPopUp.addEventListener('click', function (e) {
    e.preventDefault();
    popUp.classList.add('active');
})

closePopUp.addEventListener('click', () => {
    popUp.classList.remove('active');
})

const resultsArray = [];

let resultsBlock = document.getElementById('results-list');
let str = ' ';

for(let i=0; i<resultsArray.length; i++){
    if(resultsArray[i] !== undefined) str += "Moves: " + moves + " Time: " + resultsArray[i] + '<br>';
}
resultsBlock.innerHTML = str;
