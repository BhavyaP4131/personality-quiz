console.log("script.js connected!");

const pointValues = { A: 1, B: 2, C: 3, D: 4 };

let userAnswers = {};

const questionBlocks = document.querySelectorAll(".question-block");

questionBlocks.forEach(function (block, index) {
  const answerButtons = block.querySelectorAll(".answer-btn");
  const questionId = "question-" + (index + 1);

  answerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      answerButtons.forEach(function (btn) {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");

      const answerLetter = button.getAttribute("data-answer");
      userAnswers[questionId] = pointValues[answerLetter];

      console.log(questionId + " answered with " + answerLetter);
      console.log(userAnswers);
    });
  });
});

function displayResult() {
  const resultContainer = document.getElementById("result-container");
  const resultText = document.getElementById("result-text");

  const totalQuestions = questionBlocks.length;
  const answeredCount = Object.keys(userAnswers).length;

  if (answeredCount < totalQuestions) {
    resultText.textContent = "Please answer all " + totalQuestions + " questions before seeing your result!";
    resultContainer.style.display = "block";
    return;
  }

  let totalScore = 0;
  for (let question in userAnswers) {
    totalScore += userAnswers[question];
  }

  console.log("Total score: " + totalScore);

  let message = "";

  if (totalScore >= 5 && totalScore <= 8) {
    message = "You're a Cupcake! Warm, sweet, and always comforting to be around.";
  } else if (totalScore >= 9 && totalScore <= 12) {
    message = "You're an Ice Cream Sundae! Fun, colorful, and full of energy.";
  } else if (totalScore >= 13 && totalScore <= 16) {
    message = "You're a Chocolate Cake! Rich, elegant, and impossible to forget.";
  } else if (totalScore >= 17 && totalScore <= 20) {
    message = "You're a Fruit Tart! Down-to-earth, refreshing, and naturally charming.";
  }

  resultText.textContent = message;
  resultContainer.style.display = "block";
}

const showResultBtn = document.getElementById("show-result");
showResultBtn.addEventListener("click", displayResult);
