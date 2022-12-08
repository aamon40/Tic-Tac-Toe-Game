
// variables to check which class' turn
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// selects all the cell classes
const cellElements = document.querySelectorAll('[data-cell]');
// gets the board
const board = document.getElementById("board");
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message]');
let circleTurn;

// call the startgame function to begin the game
startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    // loop through each cell and add event listener upon click. The event is fired only once
    cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true});
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
});
}




// function to handle click events

function handleClick(e) {
    const cell = e.target; //which cell is clicked on?
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // switch current class based on whose turn it is
    // placeMark
    placeMark(cell, currentClass);
    // Check for Win
    if (checkWin(currentClass)) {
        endGame(false);
        // Check for Draw
    } else if (isDraw()) {
        endGame(true);
    } else {
        // Switch turns
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn //sets circle turn to false when called
}

function setBoardHoverClass() {
    //switches the hover class based on whose turn it currently is.
    // first we remove all classes
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }

}

// check wins for either class 
function checkWin(currentClass) {
    // check if the winning condition is met by any of the current combinations
   return WINNING_COMBINATIONS.some(combination => {
        //for each combination, check if all indexes(values in the cell elements) have the same class
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}