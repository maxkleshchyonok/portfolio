const containerNode = document.getElementById('puzzle');
const itemNodes = Array.from(containerNode.querySelectorAll('.puzzle-block'));
const countItems = 16;

let timer;
document.getElementById('play').addEventListener('click', () => {
    // randomSwap(matrix);
    // setPositionItems(matrix);
    let shuffleCount = 0;
    clearInterval(timer);
    if(shuffleCount === 0){
        timer = setInterval(()=>{
            randomSwap(matrix);
            setPositionItems(matrix);
            shuffleCount += 1;
            if(shuffleCount >= 100){
                clearInterval(timer);
            }
        }, 50);
    }
})



let matrix = getMatrix(
    itemNodes.map((item) => Number(item.dataset.matrixId))
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

itemNodes[countItems - 1].style.display = 'none';

function setPositionItems(matrix) {
    for(let y=0; y<matrix.length; y++){
        for (let x=0; x<matrix[y].length; x++){
            const value = matrix[y][x];
            const node = itemNodes[value - 1];
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

containerNode.addEventListener('click', (event) => {
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

function isWin(matrix) {
    const flatMatrix = matrix.flat();
    for (let i=0; i<winFlatArr.length; i++){
        if (flatMatrix[i] !== winFlatArr[i]){
            return false;
        }
    }
    return true;
}

const winClass = 'win'

function addWinClass() {
    setTimeout(() => {
        containerNode.classList.add(winClass)
    },200);
    setTimeout(() => {
        containerNode.classList.remove(winClass)
    },2000);
}