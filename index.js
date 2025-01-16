
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
    const boardColumn = [];
    function getColumns() {
        for (let i = 0; i < size; i++) {
            boardColumn[i] = [];
            for (let j = 0; j < size; j++) {
                boardColumn[i].push(board[j][i]);
            }
        }       
    }
    const getBoard = () => board;
    const insertMarker = function(marker, row, column) {
        if(board[row][column] === " ") {
            board[row][column] = marker;
        }
    }
    const checkWinner = function(marker) {
        let getWinner = false;
        const checkRows = board.map(item => item.every(value => value === marker));
        getColumns()
        const checkColumns = boardColumn.map(item => item.every(value => value === marker));
        if(checkRows.includes(true) ||
           checkColumns.includes(true)) {
            getWinner = true;
        }
        return getWinner;
    }
    return {createNewBoard, getBoard, insertMarker, checkWinner};
}

function createPlayer(name, marker) {
    let moves = 0;
    const getName = () => name;
    const getMarker = () => marker;
    const addMoves = () => moves++;
    const getMoves = () => moves;
    return {getName, getMarker, addMoves, getMoves}
}

const playerOne = createPlayer("Player 1","X");
const playerTwo = createPlayer("Player 2", "O");
const players = [playerOne, playerTwo]
let activePlayer = players[0];

function switchActivePlayer() {
    activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
}

function startGame() {
    const board = gameBoard();
    board.createNewBoard();
    function playRound(marker, row, column) {
        board.insertMarker(marker, row, column);
        // console.log(board.getBoard());
    }
    return {playRound, board};
}

const Game1 = startGame();
Game1.playRound(playerOne.getMarker(),0,1);
playerOne.addMoves();
Game1.playRound(playerTwo.getMarker(),0,1);
Game1.playRound(playerOne.getMarker(),1,1);
playerOne.addMoves();
Game1.playRound(playerTwo.getMarker(),2,1);
Game1.playRound(playerOne.getMarker(),0,2);
console.log(playerOne.getMoves());
// console.log(activePlayer.getMarker())
console.log(Game1.board.checkWinner(playerOne.getMarker()));
Game1.playRound(playerOne.getMarker(),1,2);
Game1.playRound(playerOne.getMarker(),2,2);
console.log(Game1.board.getBoard());
console.log(Game1.board.checkWinner(playerOne.getMarker()));
console.log(playerOne.getMoves());






