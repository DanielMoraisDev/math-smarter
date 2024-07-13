// document.addEventListener('DOMContentLoaded', () => alert('Ainda estamos em trabalho na operação de divisão (/), porém você pode aproveita-la\n\nTambém estou modificando a maneira de respostas'))

const btnGenerator = document.getElementById("btnGenerator");
const btnCheck = document.getElementById("btnCheck");
const calculationDiv = document.getElementById("calculation");
const resultDiv = document.getElementById("result");
const operationSelect = document.getElementById("operation");

let answerInput;
let correctAnswer;
let gameStarted = false;

const generateAnswerLocation = (answer, wrong1, wrong2, wrong3, type) => {
  const aResult = document.getElementById("aResult");
  const bResult = document.getElementById("bResult");
  const cResult = document.getElementById("cResult");
  const dResult = document.getElementById("dResult");

  const wrongAnswers = ['', wrong1, wrong2, wrong3];
  const answerInputs = ["a", "b", "c", "d"];
  const randomIndex = Math.floor(Math.random() * answerInputs.length);

  const selectedInputId = answerInputs[randomIndex] + "Result";
  answerInput = document.getElementById(selectedInputId);

  if (type === 'divide') {
    answerInput.innerHTML = (answer).toFixed(3);    
  } else {
    answerInput.innerHTML = answer
  }

  for (let i = 1; i <= 3; i++) {
    const wrongIndex = (randomIndex + i) % answerInputs.length;
    const wrongAnswerInputId = answerInputs[wrongIndex] + "Result";
    const wrongAnswerInput = document.getElementById(wrongAnswerInputId);
    if (type === 'divide') {
      wrongAnswerInput.innerHTML = (wrongAnswers[i]).toFixed(3);
    } else {
      wrongAnswerInput.innerHTML = wrongAnswers[i]
    }

    wrongAnswerInput.addEventListener("click", checkAnswer);
}

  answerInput.addEventListener("click", checkAnswer);
};

const generateCalculation = () => {
  const operation = operationSelect.value;
  const maxDigits = document.getElementById("maxDigits");
  const secondDigit = document.getElementById("secondDigit");
  const maxDigitsValue = parseInt(document.getElementById("maxDigits").value);
  const secondDigitValue = parseInt(
    document.getElementById("secondDigit").value
  );

  if (maxDigitsValue > 5) {
    resultDiv.innerText = "Os máximo de dígitos deve ser menor que 6";
    stop();
  } else {
    resultDiv.innerText = "";
    let num1 = getRandomNumber(maxDigitsValue);
    let num2;

    if (operation === "divide" || operation === "multiply") {
      maxDigits.style.width = "40%";
      secondDigit.style.display = "inherit";
      num2 = getRandomNumber(secondDigitValue);
    } else {
      maxDigits.style.width = "100%";
      secondDigit.style.display = "none";
      num2 = getRandomNumber(maxDigitsValue);
    }

    correctAnswer = calculate(operation, num1, num2);
    wrongAnswer1 = correctAnswer + 2
    wrongAnswer2 = correctAnswer + 4
    wrongAnswer3 = correctAnswer + 6

    if (operation === "divide") {
      generateAnswerLocation(correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3, 'divide');
    } else {
      generateAnswerLocation(correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3);
    }

    const calculation = num1 + " " + operationSymbol(operation) + " " + num2;
    calculationDiv.innerText = calculation;

    gameStarted = true;
  }
};

const checkAnswer = (event) => {
  const clickedButton = event.target; 
  const answerText = clickedButton.innerHTML; 

  if (Number(answerText) === correctAnswer) {
    resultDiv.innerText = "Você acertou!";
    gameStarted = false;
    answerInput.focus();
    startGame();
  } else {
    resultDiv.innerText = "Tente novamente!";
    answerInput.focus();
  }
};
const answerButtons = document.querySelectorAll('.answersButtons');
answerButtons.forEach(button => {
  button.addEventListener('click', checkAnswer);
});

const getRandomNumber = (maxDigitsValue) => {
  const min = Math.pow(10, maxDigitsValue - 1);
  const max = Math.pow(10, maxDigitsValue) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};  

const calculate = (operation, num1, num2) => {
  switch (operation) {
    case "add":
      return num1 + num2;
    case "subtract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      if (num2 !== 0) {
        return num1 / num2;
      } else {
        return "Erro: divisão por zero!";
      }
    default:
      return "Operação inválida!";
  }
};

const operationSymbol = (operation) => {
  switch (operation) {
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
};

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});

btnGenerator.addEventListener("click", generateCalculation);

operationSelect.addEventListener("change", startGame);
