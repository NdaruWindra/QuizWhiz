document.addEventListener("DOMContentLoaded", () => {
  let currentQuestionIndex = 0;
  let selectedOption = null;
  let isAnswered = false;
  let score = 0;
  const autoAdvanceDelay = 1000;

  const questionTextElement = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const continueButton = document.getElementById("continue-button");
  const progressBar = document.querySelector(".progress-bar");
  const speechTextElement = document.getElementById("speech-text");
  const bodyElement = document.body;

  function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
      displayResults();
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    optionsContainer.innerHTML = "";
    selectedOption = null;
    isAnswered = false;
    continueButton.disabled = true;
    continueButton.textContent = "CONTINUE";
    continueButton.style.display = "block";
    speechTextElement.textContent = currentQuestion.speech;

    questionTextElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("option-button");
      button.textContent = option;
      button.dataset.value = option;

      button.addEventListener("click", () => {
        if (!isAnswered) {
          selectOption(button);
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

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-button");

    optionButtons.forEach((button) => {
      button.classList.remove("selected");
      if (button.dataset.value === currentQuestion.correctAnswer) {
        button.classList.add("correct");
      } else if (button.dataset.value === selectedOption) {
        button.classList.add("wrong");
      }
      const clone = button.cloneNode(true);
      button.parentNode.replaceChild(clone, button);
      clone.style.cursor = "default";
    });

    if (selectedOption === currentQuestion.correctAnswer) {
      score++;
      speechTextElement.textContent = "Great job! That's correct.";
    } else {
      speechTextElement.textContent = `Oops! The correct answer was "${currentQuestion.correctAnswer}".`;
    }

    continueButton.textContent = "Next Questions...";
    continueButton.disabled = true;

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        displayResults();
      }
    }, autoAdvanceDelay);
  }

  function goToNextQuestion() {
    if (!isAnswered) {
      checkAnswer();
      return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      displayResults();
    }
  }

  function updateProgressBar() {
    const totalQuestions = questions.length;
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function displayResults() {
    questionTextElement.textContent = "Quiz Complete!";
    optionsContainer.innerHTML = `
            <p style="text-align: center; font-size: 1.3em; margin-bottom: 15px;">You have finished all questions.</p>
            <p style="text-align: center; font-size: 1.5em; font-weight: bold; color: var(--primary-blue);">Your Score: ${score} / ${questions.length}</p>
            <p style="text-align: center; font-size: 1.2em; margin-top: 15px;">Good job!</p>
        `;
    speechTextElement.textContent = "You did great!";
    updateProgressBar();

    continueButton.style.display = "none";
    bodyElement.style.height = "80vh";

    const resultButtonsContainer = document.createElement("div");
    resultButtonsContainer.id = "result-buttons-container";
    resultButtonsContainer.style.display = "flex";
    resultButtonsContainer.style.flexDirection = "column";
    resultButtonsContainer.style.gap = "15px";
    resultButtonsContainer.style.width = "100%";
    resultButtonsContainer.style.maxWidth = "300px";

    const restartButton = document.createElement("button");
    restartButton.textContent = "RESTART QUIZ";
    restartButton.classList.add("continue-button");
    restartButton.onclick = () => {
      currentQuestionIndex = 0;
      score = 0;
      resultButtonsContainer.remove();
      displayQuestion();
    };
    resultButtonsContainer.appendChild(restartButton);

    const quitButton = document.createElement("button");
    quitButton.textContent = "QUIT";
    quitButton.classList.add("continue-button");
    quitButton.style.backgroundColor = "var(--dark-grey)";
    quitButton.style.marginTop = "0";

    quitButton.onclick = () => {
      window.location.href = "/menu.html";
    };
    resultButtonsContainer.appendChild(quitButton);

    document
      .querySelector(".quiz-container")
      .appendChild(resultButtonsContainer);
  }

  continueButton.addEventListener("click", goToNextQuestion);

  displayQuestion();
});
