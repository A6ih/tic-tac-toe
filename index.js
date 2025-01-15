
function gameBoard() {
    let size = 3;
    const board = []
    function createNewBoard() {
        for (let i = 0; i < size; i++) {
            board[i] = [];
            for (let j = 0; j < size; j++) {
                board[i].push(" ");
            }
        }
    }
    const getBoard = () => board;
    const insertMarker = function(marker, row, column) {
        if(board[row][column] === " ") {
            board[row][column] = marker;
        }
    }
    return {createNewBoard, getBoard, insertMarker};
}

function createPlayer(name, marker) {
    let input = 0;
    const getName = () => name;
    const getMarker = () => marker;
    const addInput = () => input++;
    const getInput = () => input;
    return {getName, getMarker, addInput, getInput}
}

const playerOne = createPlayer("Player 1","X");
const playerTwo = createPlayer("Player 2", "O");

function startGame() {
    const board = gameBoard();
    board.createNewBoard();
    function playRound(marker, row, column) {
        board.insertMarker(marker, row, column);
        console.log(board.getBoard());
    }
    return {playRound};
}

// const Game1 = startGame();
// Game1.playRound(playerOne.getMarker(),0,1);
// playerOne.addInput();
// Game1.playRound(playerTwo.getMarker(),0,1);
// Game1.playRound(playerOne.getMarker(),1,1);
// playerOne.addInput();
// Game1.playRound(playerTwo.getMarker(),2,1);
// console.log(playerOne.getInput());




