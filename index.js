let sign = 'X';
let remaningTurn = 9;

function isWin(e) {
    const curElement = e.target;

    // checks, this box should be empty before clicking on it
    if (!isEmptyCell(curElement) || !remaningTurn) {
        return;
    }

    curElement.innerText = sign;
    const declareResult = document.getElementById('result');

    if (isGameCompletes(curElement)) {
        declareResult.innerText = sign + ' won';
        return;
    }

    changeSign();
    remaningTurn--;
    if (remaningTurn === 0) {
        declareResult.innerText = 'Match Draw'
    }

}

function isEmptyCell(element) {
    return element.textContent === '';
}

function changeSign() {
    sign = sign === 'X' ? 'O' : 'X';
    document.getElementById('playerTurn').innerText = sign;
}

function isGameCompletes(element) {
    const boxNo = getLastNumberFromId(element.id);
    const combinations = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [4, 5, 6], [7, 8, 9], [2, 5, 8], [3, 6, 9], [3, 5, 7]];

    for (let array of combinations) {
        if (array.includes(boxNo) && checkIsFilledCorrectly(array)) {
            remaningTurn = 0;

            color3ConsecutiveMatchedCell(array);
            return true;
        }
    }

    return false;
}


function getLastNumberFromId(str) {      // we know box no would range to 1-9
    return Number(Array.from(str)[str.length - 1])
}

function checkIsFilledCorrectly(arr) {
    for (let el of arr) {
        const element = document.getElementById(`number-${el}`);

        if (element.textContent === '' || (sign !== element.textContent))
            return false;
    }

    return true;
}


function color3ConsecutiveMatchedCell(array) {
    array.forEach(boxNo => {
        document.getElementById(`number-${boxNo}`).style.background = '#fca103'
    });
}


function restartGame() {
    // window.location.reload()   // avoiding this in the particular part but used in the next part
    clearCellContent();
    document.getElementById('playerTurn').innerText = 'X';
    remaningTurn = 9;
    document.getElementById('result').innerText = '';
    sign = 'X'
}

function clearCellContent() {
    const allCells = document.querySelector('.gameBoard').children;
    for (let element of allCells) {
        element.innerText = ''
        element.style.background = ''
    }
}
