//Wait for the page to load before running the game
//Get the button elements and add listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        });
    }

    runGame('addition');
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    //Creates 2 random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'subtract') {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        incrementScore();
    } else {
        alert(`Awwww...  you answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc.)
 * directly from the DOM, and returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, 'addition'];
    } else if (operator === '-') {
        return [operand1 - operand2, 'subtract'];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

function incrementScore() {
    let score = document.getElementById('score');
    score.innerText = parseInt(score.innerText) + 1;
}

function incrementWrongAnswer() {
    let incorrect = document.getElementById('incorrect');
    incorrect.innerText = parseInt(incorrect.innerText) + 1;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').innerHTML = operand1;
    document.getElementById('operand2').innerHTML = operand2;
    document.getElementById('operator').innerHTML = '+';
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').innerHTML = operand1;
    document.getElementById('operand2').innerHTML = operand2;
    document.getElementById('operator').innerHTML = '-';
}

function displayMultiplyQuestion(operand1, operand2) {

}

function displayDivideQuestion(operand1, operand2) {

}