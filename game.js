const grid = document.querySelector(".game");
var turn = 0;
var end = false;
var playerOne = [];
var playerTwo = [];
var clickedCards = [];
//array con las combinaciones ganadoras posibles
var winCombinations = [
    ["cell-1-1", "cell-1-2", "cell-1-3"],
    ["cell-2-1", "cell-2-2", "cell-2-3"],
    ["cell-3-1", "cell-3-2", "cell-3-3"],
    ["cell-1-1", "cell-2-1", "cell-3-1"],
    ["cell-1-2", "cell-2-2", "cell-3-2"],
    ["cell-1-3", "cell-2-3", "cell-3-3"],
    ["cell-1-1", "cell-2-2", "cell-3-3"],
    ["cell-3-1", "cell-2-2", "cell-1-3"],
]

for (let i = 0; i < 3; i++) {
    createRow(i);
    const row = document.querySelector(`.row-${i+1}`);
    for (let j = 0; j < 3; j++) {
        let cell = document.createElement("div");
        cell.addEventListener("click", draw);
        cell.className = "cell";
        cell.id = `cell-${i+1}-${j+1}`
        row.appendChild(cell);
    }
}

function createRow(index) {
    let row = document.createElement("div");
    row.className = `row-${index+1}`;
    grid.appendChild(row);
}

function draw(e) {
    //obtenemos el elemento HTML
    let coord = e.target;
    //comprobamos que siempre tenga el atributo coord.id el elemento seleccionado
    if (coord.id == false || turn > 9 || end == true) {
        return
    }
    //Si el turno es impar entonces dibujamos las x
    if (turn % 2 != 0 && !clickedCards.includes(coord.id)) {
        clickedCards.push(coord.id);
        playerTwo.push(coord.id);
        drawX(coord);
        if (playerTwo.length >= 3) {
            end = itsWinner(playerTwo);
            if (end) {
                const msg = document.querySelector(".win");
                let message = "<h2>El jugador 2 es el ganador, ¡Felicitaciones!<h2>";
                msg.innerHTML = message;
            }
        }
        turn++;

        //si el turno es par entonces dibujamos O    
    } else if (turn % 2 == 0 && !clickedCards.includes(coord.id)) {
        clickedCards.push(coord.id);
        playerOne.push(coord.id);
        drawO(coord);
        if (playerOne.length >= 3) {
            end = itsWinner(playerOne);
            if (end) {
                const msg = document.querySelector(".win");
                let message = "<h2>El jugador 1 es el ganador, ¡Felicitaciones!<h2>";
                msg.innerHTML = message;
            }
        }
        turn++;

    }
    //console.log(turn)
    //console.log(end)
    //Determinamos el empate si el turno es 9 y no hay ganador
    if (turn >= 9 && end == false) {
        const msg = document.querySelector(".win");
        let message = "<h2>Empate el juego ha terminado<h2>";
        msg.innerHTML = message;
    }
}

function drawX(cell) {
    let figure = document.createElement("p");
    figure.innerHTML = "X"
    cell.appendChild(figure);
}

function drawO(cell) {
    let figure = document.createElement("p");
    figure.innerHTML = "O"
    cell.appendChild(figure);
}

function itsWinner(player) {
    let combinations = [];
    let win = false;
    for (let i = 0; i < winCombinations.length; i++) {
        for (let j = 0; j < 3; j++) {
            combinations.push(player.includes(winCombinations[i][j]))
        }
        if (combinations[0] == true && combinations[1] == true && combinations[2] == true) {
            win = true
            return win;
        } else {
            combinations = [];
        }
    }
    return win;
}