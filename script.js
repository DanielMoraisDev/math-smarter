const btnGenerator = document.getElementById('btnGenerator');
const btnCheck = document.getElementById('btnCheck');
const calculationDiv = document.getElementById('calculation');
const answerInput = document.getElementById('answer');
const resultDiv = document.getElementById('result');
const operationSelect = document.getElementById('operation');

let correctAnswer;
let gameStarted = false;

const generateCalculation = () => {
    const operation = operationSelect.value;
    const maxDigits = parseInt(document.getElementById("maxDigits").value);

    const num1 = getRandomNumber(maxDigits);
    const num2 = getRandomNumber(maxDigits);

    correctAnswer = calculate(operation, num1, num2);
    console.log(correctAnswer)

    const calculation = num1 + " " + operationSymbol(operation) + " " + num2 + " = ?";
    calculationDiv.innerText = calculation;
    resultDiv.innerText = '';
    answerInput.value = '';
    answerInput.focus()
    gameStarted = true;
    
};

const checkAnswer = () => {
    const userAnswer = parseFloat(answerInput.value);
    if (!isNaN(userAnswer)) {
        if (userAnswer === correctAnswer) {
            gameStarted = false;
            answerInput.focus()
            startGame()
        } else {
            resultDiv.innerText = "Tente novamente!";
            answerInput.focus()
        }
    } else {
        resultDiv.innerText = "Por favor, insira um número válido.";
        answerInput.focus()
    }
};
const getRandomNumber = (maxDigits) => {
    const min = Math.pow(10, maxDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const calculate = (operation, num1, num2) => {
    switch(operation) {
        case "add":
            return num1 + num2;
        case "subtract":
            return num1 - num2;
        case "multiply":
            return num1 * num2;
        case "divide":
            if(num2 !== 0) {
                return num1 / num2;
            } else {
                return "Erro: divisão por zero!";
            }
        default:
            return "Operação inválida!";
    }
};

const operationSymbol = (operation) => {
    switch(operation) {
        case "add":
            return "+";
        case "subtract":
            return "-";
        case "multiply":
            return "x";
        case "divide":
            return "/";
        default:
            return "?";
    }
};

const startGame = () => {
    generateCalculation();
}

document.addEventListener('DOMContentLoaded', () => {
    startGame()
});

btnGenerator.addEventListener('click', generateCalculation);
btnCheck.addEventListener('click', checkAnswer);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkAnswer()
    }
})
operationSelect.addEventListener('change', startGame);

