const startGameBtn = document.querySelector("#start-btn");
startGameBtn.addEventListener("click", displayController);

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
    const getBoardItems = (row,column) => board[row][column];
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
    return {createNewBoard, getBoard, insertMarker, checkWinner, getBoardItems};
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
    let result = "";
    function playRound(event) {
        const target = event.target;
        const row = +target.getAttribute('data-row');
        const column = +target.getAttribute('data-column');
        console.log(`Current turn : Player: ${activePlayer.getName()}, Marker: ${activePlayer.getMarker()}`);
        board.insertMarker(activePlayer.getMarker(), row, column);
        target.textContent = board.getBoardItems(row,column);
        if (board.checkWinner(activePlayer.getMarker()) === true) {
            result = activePlayer.getName() + " wins!";
        }
        else if (board.checkWinner(activePlayer.getMarker()) === "Draw") {
            result = "It's a Draw!"
        }
        switchActivePlayer();
        console.log(`Next Turn : Player: ${activePlayer.getName()}, Marker: ${activePlayer.getMarker()}`);
        // console.log(board.getBoard());
    }
    return {playRound, board, result};
}

// const Game1 = startGame();
// Game1.playRound(0,0);
// Game1.playRound(0,1);
// Game1.playRound(1,0);
// Game1.playRound(2,0);
// Game1.playRound(0,2);
// Game1.playRound(1,1);
// Game1.playRound(2,2);
// Game1.playRound(2,1);

function displayController() {
    const game = startGame();
    const displayBody = document.querySelector("#game-display");
    displayBody.removeChild(document.querySelector("#start-btn"));
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "RESTART";
    restartBtn.addEventListener("click", resetDisplay);
    const displayBoard = document.createElement("div");
    displayBoard.setAttribute("id","game-board");
    function createDisplayBoard(){
        const divs = [];
        const buttons = [];
        for(let i = 0; i < 3; i++) {
            divs[i] = document.createElement("div");
            for(let j = 0; j < 3; j++) {
                buttons[j] = document.createElement("button");
                buttons[j].setAttribute("data-row",`${[i]}`);
                buttons[j].setAttribute("data-column",`${[j]}`);
                buttons[j].textContent = game.board.getBoardItems([i],[j]);
                buttons[j].addEventListener("click", game.playRound);
                divs[i].appendChild(buttons[j]);
            }
            displayBoard.appendChild(divs[i]);
        }
        displayBody.appendChild(displayBoard);
        displayBody.appendChild(restartBtn);
    }
    function resetDisplay() {
        displayBoard.textContent = "";
        game.board.createNewBoard();
        createDisplayBoard();
    }
    return createDisplayBoard();
}












