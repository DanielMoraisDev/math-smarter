// document.addEventListener('DOMContentLoaded', () => alert('Ainda estamos em trabalho na operação de divisão (/), porém você pode aproveita-la\n\nTambém estou modificando a maneira de respostas'))

const btnGenerator = document.getElementById("btnGenerator");
const btnCheck = document.getElementById("btnCheck");
const calculationDiv = document.getElementById("calculation");
const resultDiv = document.getElementById("result");
const operationSelect = document.getElementById("operation");

let correctAnswer;
let gameStarted = false;

const generateAnswerLocation = () => {
  const aResult = document.getElementById("aResult");
  const bResult = document.getElementById("bResult");
  const cResult = document.getElementById("cResult");
  const dResult = document.getElementById("dResult");

  const answerInputs = ["a", "b", "c", "d"];
  const randomIndex = Math.floor(Math.random() * answerInputs.length);

  const selectedInputId = answerInputs[randomIndex] + 'Result';
  const selectedInput = document.getElementById(selectedInputId);

  console.log(selectedInputId)

  selectedInput.addEventListener('click', () => {
    
  });
};

generateAnswerLocation()

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
    console.log(correctAnswer);

    const calculation = num1 + " " + operationSymbol(operation) + " " + num2;
    calculationDiv.innerText = calculation;

    gameStarted = true;
  }
};

const checkAnswer = () => {
  // const userAnswer = generateAnswerLocation();
  // if (!isNaN(userAnswer)) {
  //   if (userAnswer === correctAnswer) {
  //     resultDiv.innerText = "Você acertou!";
  //     gameStarted = false;
  //     answerInput.focus();
  //     startGame();
  //   } else {
  //     resultDiv.innerText = "Tente novamente!";
  //     answerInput.focus();
  //   }
  // } else {
  //   resultDiv.innerText = "Por favor, insira um número válido.";
  //   answerInput.focus();
  // }
};

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

btnCheck.addEventListener("click", checkAnswer);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});
operationSelect.addEventListener("change", startGame);
