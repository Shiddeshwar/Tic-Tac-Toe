const Player = (marker) => {
    return {marker};
};
const gameBoard = (() => {
    let board = [];
    let PlayCount = 0;
    let player1 = Player("X");
    let player2 = Player("O");
    let container = document.getElementsByClassName("container");
    //JS Event Delegation
    let arrVal;
    container[0].addEventListener('click',(e) => {
        let box = e.target;
        arrVal = box.attributes[0].nodeValue;
        if (PlayCount < 9) {
            if (PlayCount % 2 === 0 && board[arrVal] === undefined) {
                board[arrVal] = player1.marker;
                box.textContent = player1.marker;
                PlayCount++;
            }
            else if(board[arrVal] === undefined) {
                board[arrVal] = player2.marker;
                box.textContent = player2.marker;
                box.textContent = player2.marker;
                PlayCount++;
            }
        }
    });
})();

const displayBoard = ((marker, arrVal) => {

})();

