let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 5;

const guessInput = document.getElementById("guessInput");
const submitGuess = document.getElementById("submitGuess");
const feedback = document.getElementById("feedback");
const attempts = document.getElementById("attempts");
const restartGame = document.getElementById("restartGame");

submitGuess.addEventListener("click", () => {
  const userGuess = parseInt(guessInput.value);
  
  if (!userGuess || userGuess < 1 || userGuess > 100) {
    feedback.textContent = "Please enter a number between 1 and 100.";
    return;
  }

  if (userGuess === randomNumber) {
    feedback.textContent = "🎉 Congratulations! You guessed the number!";
    feedback.style.color = "lime";
    gameOver();
  } else if (userGuess > randomNumber) {
    feedback.textContent = "Too high! Try again.";
  } else {
    feedback.textContent = "Too low! Try again.";
  }

  attemptsLeft--;
  attempts.textContent = attemptsLeft;

  if (attemptsLeft === 0) {
    feedback.textContent = `😞 Game Over! The number was ${randomNumber}.`;
    feedback.style.color = "red";
    gameOver();
  }

  guessInput.value = "";
});

function gameOver() {
  guessInput.disabled = true;
  submitGuess.disabled = true;
  restartGame.classList.remove("hidden");
}

restartGame.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 5;
  attempts.textContent = attemptsLeft;
  feedback.textContent = "";
  feedback.style.color = "white";
  guessInput.disabled = false;
  submitGuess.disabled = false;
  guessInput.value = "";
  restartGame.classList.add("hidden");
});
