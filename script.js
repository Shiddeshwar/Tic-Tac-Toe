const Player = (marker) => {
    return {marker};
};

const game = (() => {

    ////////////////Game Initialization////////////////////////////////////////
    let container = document.getElementsByClassName("container");
    container[0].style.display = "none";
    let player1Turn = true;
    // let boardOneD = ["00","01","01","10","11","12","20","21","22"];


    ////////////////function to create 3D Board////////////////////////////////
    const threeDArr = () => {
        let arr = new Array(3);
        for (let i = 0; i < 3; i++) {
            arr[i] = new Array(3);
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                arr[i][j] = "-"; 
            }
        }
        return arr;
    };
    let board = threeDArr(); // board


    ////////////////Player Intialization and Markers Assignment////////////////
    let player1 = Player("X"); // Default markers
    let player2 = Player("O");

    const chooseMarker = () => { //If markers are changed
        let chooseClass = document.body.getElementsByClassName('choose');
        let options = document.body.getElementsByClassName("options");
        options[0].addEventListener('click',markerInput);
        function markerInput(e) {
            if (e.target.innerHTML === "O") {
                player1 = Player("O");
                player2 = Player("X");
            }
            chooseClass[0].style.display = "none";
            container[0].style.display = "grid"; 
        };
    };
    chooseMarker();


    ////////////////Populate Board With Players Input//////////////////////////
    ////////////////And check for Winners//////////////////////////////////////
    // const spliceFunction = (ij) => {
    
    //     for (let i = 0; i < boardOneD.length; i++) {
    //         if (boardOneD[i] === ij) {
    //             boardOneD.splice(i,1);
    //             break;  
    //         }
    //     }
        
    // }
    // const opponentChoice = (ij) => {
    //     spliceFunction(ij);
    //     let choice = getRandomInt(boardOneD.length);
    //     let res = boardOneD[choice];
    //     spliceFunction(res);
    //     return breakDataKey(res);
    // };
    const breakDataKey = (ij) => {
        let i = ij[0];
        let j = ij[1];
        return {
            i,
            j
        };
    };

    const FillBoardFunc = (e) => {
        let box = e.target;
        let ij = box.attributes[0].nodeValue;
        let cell = breakDataKey(ij);
        
        if (box.attributes["data-key"] != undefined) {
            if (player1Turn && board[cell.i][cell.j] === "-") {
                board[cell.i][cell.j] = player1.marker;
                box.textContent = player1.marker;
                let winnerObj = checkWinner(board);
                masterResultDisplay(winnerObj);
                player1Turn = false;
            }
            if(!player1Turn && board[cell.i][cell.j] === "-") {
                board[cell.i][cell.j] = player2.marker;
                box.textContent = player2.marker;
                let winnerObj = checkWinner(board);
                masterResultDisplay(winnerObj);
                player1Turn = true;
            }
        }

    };
    const FillBoard = () => {
        container[0].addEventListener('click',FillBoardFunc);
    };
    FillBoard();


    ////////////////Result Display and box highlighting/////////////////////
    const masterResultDisplay = (winnerObj) => {
        if(winnerObj.marker !== "-") {
            container[0].removeEventListener('click',FillBoardFunc); //Disable clicks on remaining board cells.
            colorWinningBoxes(winnerObj);
            resultDisplay(winnerObj.marker);
        }
        else if(isMovesLeft(board) === false) {
            resultDisplay(winnerObj.marker);
        }
    };
    const colorWinningBoxes = (obj) => {
        let box1 = document.querySelector(`div[data-key="${obj.box1}"]`);
        let box2 = document.querySelector(`div[data-key="${obj.box2}"]`);
        let box3 = document.querySelector(`div[data-key="${obj.box3}"]`);
        box1.style.boxShadow = "0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #00ff6a, 0 0 0.4rem #00ff6a, 0 0 1.4rem #00ff6a, inset 0 0 1.3rem #00ff6a";
        box2.style.boxShadow = "0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #00ff6a, 0 0 0.4rem #00ff6a, 0 0 1.4rem #00ff6a, inset 0 0 1.3rem #00ff6a";
        box3.style.boxShadow = "0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #00ff6a, 0 0 0.4rem #00ff6a, 0 0 1.4rem #00ff6a, inset 0 0 1.3rem #00ff6a";
    };
    const resultDisplay = (marker) => {
        let declareWinner = document.createElement('div');
        if (marker === "X" || marker === "O") declareWinner.innerHTML = marker + " is the winner!";
        else declareWinner.innerHTML = "It's a TIE!";
        document.body.insertBefore(declareWinner,document.body.firstElementChild);
        let button = document.createElement('button');
        button.innerHTML = "RESTART";
        button.classList.add('replay');
        document.body.insertBefore(button,document.body.lastElementChild);
        button.addEventListener('click',playAgain);
    };
    const playAgain = () => {
        location.reload();
    };


    ////////////////Check for winners////////////////
    const isMovesLeft = (board) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "-") return true;
            }
        }
        return false;
    };
    const checkWinner = (board) => {
        //check rows
        for (let row = 0; row < 3; row++) {
            for (let j = 0; j < 3; j++) {
                if (board[row][0] != "-" && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
                    let box1 = row + "0", box2 = row + "1", box3 = row + "2";
                    return packer(board[row][0],box1,box2,box3); 
                }
            }
        }
        //check cols
        for (let col = 0; col < 3; col++) {
            for (let j = 0; j < 3; j++) {
                if (board[0][col] != "-" && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
                    let box1 = "0" + col, box2 = "1" + col, box3 = "2" + col;
                    return packer(board[0][col],box1,box2,box3);
                }
            }
        }
        //check diagonal
        if (board[0][0] != "-" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            let box1 = "00", box2 = "11", box3 = "22";
            return packer(board[0][0],box1,box2,box3)
        }
        if (board[0][2] != "-" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            let box1 = "02", box2 = "11", box3 = "20";
            return packer(board[0][2],box1,box2,box3)
        }
        else {
            return {marker:"-"}; 
            //since checkWinner function is called before even winner is decided.  
        }
    };
    const packer = (marker,box1,box2,box3) => {
        return {marker,box1,box2,box3};
    };//Winning locations also sent for further highliting
    
    
    ////////////////Generate Random numbers////////////////
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
})();