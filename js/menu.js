let selectedQuizType = null;

const quizCards = document.querySelectorAll(".menu-quiz");
const continueButton = document.getElementById("button-continue");

quizCards.forEach((card) => {
  card.addEventListener("click", () => {
    quizCards.forEach((item) => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");
    selectedQuizType = card.dataset.quizType;

    continueButton.disabled = false;
  });
});

continueButton.addEventListener("click", () => {
  if (selectedQuizType) {
    if (selectedQuizType === "general") {
      window.location.href = "/general-quiz.html";
    } else if (selectedQuizType === "math") {
      window.location.href = "/math-quiz.html";
    } else if (selectedQuizType === "physics") {
      window.location.href = "/physics-quiz.html";
    } else if (selectedQuizType === "history") {
      window.location.href = "/history-quiz.html";
    } else {
      alert(
        `Kuis ${selectedQuizType.toUpperCase()} belum memiliki halaman tujuan spesifik.`
      );
    }
  } else {
    alert("Silakan pilih kuis terlebih dahulu!");
  }
});
