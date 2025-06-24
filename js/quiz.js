document.addEventListener("DOMContentLoaded", () => {
  let currentQuestionsIndex = 0;
  let selectedOption = null;
  let inAnswered = false;
  let score = 0;

  const questionTextElement = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const continueButton = document.getElementById("continue-button");
  const progressBar = document.getElementById(".progress-bar");
  const speechTextElement = document.getElementById("speech-text");

  function displayQuestions() {
    if (currentQuestionsIndex >= questions.length) {
      displayResults();
      return;
    }

    const currentQuestions = questions[currentQuestionsIndex];

    optionsContainer.innerHTML = " ";
    selectedOption = null;
    isAnswered = false;
    continueButton.disabled = true;
    speechTextElement.textContent = currentQuestions.speech;

    questionTextElement.textContent = currentQuestions.question;

    currentQuestions.options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("option-button");
      button.textContent = option;
      button.dataset.value = option;

      button.addEventListener("click", () => {
        if (!isAnswered) {
          selectedOption(button);
        }
      });
      optionsContainer.appendChild(button);
    });
    updateProgressBar();
  }

  function selectOption(button) {
    document.querySelectorAll(".option-button").forEach((btn) => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");
    selectedOption = button.dataset.value;
    continueButton.disabled = false;
  }

  function checkAnswer() {
    isAnswered = true;
    continueButton.disabled = false;

    const currentQuestions = questions[currentQuestionsIndex];
    const optionsButtons = document.querySelectorAll(".option-button");

    optionsButtons.forEach((button) => {
      button.classList.remove("selected");
      if (button.dataset.value === currentQuestions.correctAnswer) {
        button.classList.add("correct");
      } else if (button.dataset.value === selectedOption) {
        button.classList.add("wrong");
      }
      button.style.cursor = "default";
    });
      
  }
  displayQuestion();
});
