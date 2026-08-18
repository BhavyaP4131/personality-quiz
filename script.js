console.log("script.js connected!");

// ============================================================
// Object to store the user's selected answer for each question.
// Key = question number, Value = point value of the selected answer.
// ============================================================
let userAnswers = {};

// ============================================================
// Select all question blocks on the page.
// ============================================================
const questionBlocks = document.querySelectorAll(".question-block");

// ============================================================
// For each question block, find its answer buttons and attach
// a click event listener to each one.
// ============================================================
questionBlocks.forEach(function (block) {
  const answerButtons = block.querySelectorAll(".answer-btn");
  const questionNumber = block.getAttribute("data-question");

  answerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove the "selected" class from every button in this block
      answerButtons.forEach(function (btn) {
        btn.classList.remove("selected");
      });

      // Add "selected" to the button that was just clicked
      button.classList.add("selected");

      // Store this question's point value in userAnswers
      const pointValue = parseInt(button.getAttribute("data-answer"));
      userAnswers[questionNumber] = pointValue;

      console.log("Question " + questionNumber + " answered with value " + pointValue);
      console.log(userAnswers);
    });
  });
});

// ============================================================
// Calculates the total score from userAnswers and maps it
// to a dessert result category.
// ============================================================
function displayResult() {
  const resultContainer = document.getElementById("result-container");

  // Make sure every question has been answered before scoring
  const totalQuestions = questionBlocks.length;
  const answeredCount = Object.keys(userAnswers).length;

  if (answeredCount < totalQuestions) {
    resultContainer.textContent =
      "Please answer all " + totalQuestions + " questions before seeing your result!";
    return;
  }

  // Sum up the point values of every answered question
  let totalScore = 0;
  for (let question in userAnswers) {
    totalScore += userAnswers[question];
  }

  console.log("Total score: " + totalScore);

  // Map the total score to a dessert result category
  let resultText = "";

  if (totalScore >= 5 && totalScore <= 8) {
    resultText = "You're a Cupcake! Warm, sweet, and always comforting to be around.";
  } else if (totalScore >= 9 && totalScore <= 12) {
    resultText = "You're an Ice Cream Sundae! Fun, colorful, and full of energy.";
  } else if (totalScore >= 13 && totalScore <= 16) {
    resultText = "You're a Chocolate Cake! Rich, elegant, and impossible to forget.";
  } else if (totalScore >= 17 && totalScore <= 20) {
    resultText = "You're a Fruit Tart! Down-to-earth, refreshing, and naturally charming.";
  }

  resultContainer.textContent = resultText;
}

// ============================================================
// Attach a click event listener to the "Show Results" button
// that calls displayResult() when clicked.
// ============================================================
const showResultsBtn = document.getElementById("show-results-btn");
showResultsBtn.addEventListener("click", displayResult);
