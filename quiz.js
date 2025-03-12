const fs = require("fs");
const readline = require("readline");

const questions = JSON.parse(fs.readFileSync("questions.json", "utf8"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentQuestionIndex = 0;
let score = 0;

function askQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];

    rl.question(`${currentQuestion.question}\n`, (answer) => {
      if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        console.log("Correct!\n");
        score += 1;
      } else {
        console.log(`Incorrect!\nCorrect answer: ${currentQuestion.answer}.\n`);
      }
      
      console.log(`Your current score is: ${score}\n`);
      
      currentQuestionIndex++;
      askQuestion();
    });
  } else {
    endQuiz();
  }
}

function endQuiz() {
  console.log("Quiz ended!");
  console.log(`Your final score is: ${score}\n`);
  rl.close();
}

askQuestion();