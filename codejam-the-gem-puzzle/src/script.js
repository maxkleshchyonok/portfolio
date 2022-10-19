const containerNode = document.getElementById('puzzle');
const itemNodes = Array.from(containerNode.querySelectorAll('.puzzle-block'));
const countItems = 16;

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

document.getElementById('play').addEventListener('click', () => {
    const shuffledArray = shuffleArray(matrix.flat())
    matrix = getMatrix(shuffledArray)
    setPositionItems(matrix)
})

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
    const isValid = isValidForSwap(buttonCoords, blankCoords)
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
}