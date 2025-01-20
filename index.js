
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
    const rightDiagonal = []
    function getRightDiagonal() {
        for (let i = 0; i < size; i++) {
            rightDiagonal[i] = [];
            for (let j = 0; j < size; j++) {
                rightDiagonal[i].push(board[j][j]);
            }
        }     
    }
    const leftDiagonal = []
    function getLeftDiagonal() {
        const leftSize = size - 1;
        for (let i = 0; i < size; i++) {
            leftDiagonal[i] = [];
            for (let j = 0; j < size; j++) {
                leftDiagonal[i].push(board[j][leftSize - j]);
            }
        }     
    }
    const getBoard = () => board;
    const insertMarker = function(marker, row, column) {
        if(board[row][column] === " ") {
            board[row][column] = marker;
        }
        else {
            switchActivePlayer();
            console.log("Marker already exist! find a empty spot!")
        }
    }
    const checkWinner = function(marker) {
        let getWinner = false;
        const checkRows = board.
                          map(item => item.every(value => value === marker));
        getColumns()
        const checkColumns = boardColumn.
                             map(item => item.every(value => value === marker));
        getRightDiagonal()
        const checkRightDiagonal = rightDiagonal.
                                   map(item => item.every(value => value === marker));
        getLeftDiagonal()
        const checkLeftDiagonal = leftDiagonal.
                                  map(item => item.every(value => value === marker));
        if(checkRows.includes(true) ||
           checkColumns.includes(true) ||
           checkRightDiagonal.includes(true) ||
           checkLeftDiagonal.includes(true)) {
            getWinner = true;
        }
        else if(!board.flat().includes(" ")) {
            getWinner = "Draw";
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
    function playRound(row, column) {
        console.log(`Current turn : Player: ${activePlayer.getName()}, Marker: ${activePlayer.getMarker()}`);
        board.insertMarker(activePlayer.getMarker(), row, column);
        console.log(board.getBoard());
        if (board.checkWinner(activePlayer.getMarker()) === true) {
            console.log(activePlayer.getName() + " wins!");
        }
        else if (board.checkWinner(activePlayer.getMarker()) === "Draw") {
            console.log("It's a Draw!");
        }
        switchActivePlayer();
        console.log(`Next Turn : Player: ${activePlayer.getName()}, Marker: ${activePlayer.getMarker()}`);
        // console.log(board.getBoard());
    }
    return {playRound, board};
}

const Game1 = startGame();
Game1.playRound(0,0);
Game1.playRound(0,1);
Game1.playRound(1,0);
Game1.playRound(2,0);
Game1.playRound(0,2);
Game1.playRound(1,1);
Game1.playRound(2,2);
Game1.playRound(2,1);

function displayController() {
    
}











