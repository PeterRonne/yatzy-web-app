import { Game } from "../src/models/Game.js";

let gameManager = new Game();

const rollBtn = document.querySelector(".roll-btn");
rollBtn.addEventListener("click", showDice);
rollBtn.addEventListener("click", showScore);
let btnClick = 0;
// showDice();

const dice = document.querySelectorAll(".dice");
dice.forEach((die, index) => die.addEventListener("click", () => toggleLock(index)));

const inputs = document.querySelectorAll("input");
inputs.forEach((input, index) => {
    if (input.id != "sum" && input.id != "bonus" && input.id != "total") {
        input.addEventListener("click", () => saveScore(index));
    }
});

function toggleLock(index) {
    if (btnClick > 0) {
        gameManager.toggleLock(index);
        dice[index].classList.toggle("locked");
        dice[index].classList.toggle("dice-hover");
    }
}

function showDice() {
    if (gameManager.nrOfThrowsLeft > 0) {
        const diceSound = new Audio("soundEffects/dice_shake.mp3");
        diceSound.play();

        let eyes = gameManager.throwDice();
        let images = document.querySelectorAll("img");
        for (let i = 0; i < eyes.length; i++) {
            switch (eyes[i]) {
                case 1:
                    images[i].src = "images/dice-1.svg";
                    break;
                case 2:
                    images[i].src = "images/dice-2.svg";
                    break;
                case 3:
                    images[i].src = "images/dice-3.svg";
                    break;
                case 4:
                    images[i].src = "images/dice-4.svg";
                    break;
                case 5:
                    images[i].src = "images/dice-5.svg";
                    break;
                case 6:
                    images[i].src = "images/dice-6.svg";
                    break;
                default:
                    break;
            }
        }
        showNumberOfThrowsLeft();
        btnClick++;
    }
}

function showNumberOfThrowsLeft() {
    document.querySelector("#turn").innerHTML = `Turns left ${gameManager.nrOfThrowsLeft}`;
}

function resetDice() {
    const click = new Audio("soundEffects/click.mp3");
    click.play();

    for (const die of dice) {
        die.classList.remove("locked");
        die.classList.add("dice-hover");
    }
    gameManager.resetDice();
    showNumberOfThrowsLeft();
    btnClick = 0;
}

function showScore() {
    const results = gameManager.calculateScores();
    for (let index = 0; index < inputs.length - 1; index++) {
        inputs[index].value = results[index];
    }
}

function saveScore(index) {
    if (btnClick > 0 && !gameManager.isGameOver()) {
        let input = inputs[index];
        input.classList.add("saved");
        input.classList.remove("input-hover");
        gameManager.saveScore(index);
        gameManager.calculateScores();

        inputs[6].value = gameManager.getUppserSectionSum();
        inputs[7].value = gameManager.getBonus();
        inputs[17].value = gameManager.getTotal();
        resetDice();
    }

    if (gameManager.isGameOver()) {
        newGame();
    }
}

function newGame() {
    if (confirm("Want to play again\nEither OK or Cancel.")) {
        window.location.reload();
    }
}

// For testing
function setGameOver() {
    gameManager.setGameOver();
}
window.setGameOver = setGameOver;
