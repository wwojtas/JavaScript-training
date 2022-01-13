window.onload = function () {
  quiz.init();

}

class Quiz {
  questions = [{
      q: "Ile jest 10 / 2 ?",
      answers: ["4", "5", "4.5"],
      correctAnswerNum: 1
    },
    {
      q: "Ile jest 16 + 2 ?",
      answers: ["18", "16", "789"],
      correctAnswerNum: 0
    },
    {
      q: "Ile jest 8 * 2 ?",
      answers: ["18", "10", "16"],
      correctAnswerNum: 2
    }
  ];

  currentQuestionIndex = -1;
  heading = null;
  questionParagraph = null;
  answer0 = null;
  answer1 = null;
  answer2 = null;
  correctAnswerNum = null;

  userSelectedInput = null;

  userCorrectAnswersNum = 0;
  userBadAnswersNum = 0;
  saveAnswerButton = null;
  nextQuestionButton = null;

  modalWindow = null;


  init() {
    this.heading = document.querySelector(".alert-heading")
    this.answer0 = document.querySelector("#answer0");
    this.answer1 = document.querySelector("#answer1");
    this.answer2 = document.querySelector("#answer2");
    this.querySelector = document.querySelector("#questionParagraph");

    this.saveAnswerButton = document.querySelector("#saveAnswerButton");
    this.nextQuestionButton = document.querySelector("#nextQuestionButton");

    this.setNextQuestionData();

    this.saveAnswerButton.addEventListener("click", this.checkAnswer);
    this.nextQuestionButton.addEventListener("click", this.setNextQuestionData);

    this.initModal();


  }

  initModal = () => {
    this.modalWindow = new bootstrap.Modal(document.getElementById("modalWindow"));
    document.getElementById("closeModal").addEventListener("click", this.restartQuiz);
  }


  checkAnswer = () => {
    this.userSelectedInput = document.querySelector("input[type='radio']:checked");
    if (!this.userSelectedInput) return;

    const selectedIndex = this.userSelectedInput.getAttribute("data-index");
    if (selectedIndex == this.correctAnswerNum) {
      this.userCorrectAnswersNum++;
      this.userSelectedInput.classList.add("is-valid");
    } else {
      this.userBadAnswersNum++;
      this.userSelectedInput.classList.add("is-invalid");

    }
    this.setUserStats();

    this.saveAnswerButton.classList.add("disabled");
    this.nextQuestionButton.classList.remove("disabled");

  }

  setUserStats = () => {
    document.getElementById("correctAnswers").innerHTML = this.userCorrectAnswersNum;
    document.getElementById("badAnswers").innerHTML = this.userBadAnswersNum;
  }

  setNextQuestionData = () => {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      console.log("koniec quizu");
      this.showModalResults();
      return;
    }

    const question = this.questions[this.currentQuestionIndex];
    const qstr = `Pytanie ${this.currentQuestionIndex+1} 
                  z ${this.questions.length}: `;
    this.heading.innerHTML = qstr + question.q;
    this.answer0.innerHTML = question.answers[0];
    this.answer1.innerHTML = question.answers[1];
    this.answer2.innerHTML = question.answers[2];
    this.correctAnswerNum = question.correctAnswerNum;

    document.querySelectorAll("input[type='radio']").forEach((el) => {
      el.classList.remove("is-valid");
      el.classList.remove("is-invalid");
      el.checked = false;
    });

    this.saveAnswerButton.classList.remove("disabled");
    this.nextQuestionButton.classList.add("disabled");

  }


  showModalResults = () => {

    const modalParagraph = document.getElementById("modalResults");

    let information;
    if (this.userCorrectAnswersNum >= this.userBadAnswersNum) {
      information = "Brawo. Przynajmniej połowa z odpowiedzi jest prawidłowa.";
    } else {
      information = "Niestety mniej niż połowa z odpowiedzi jest prawidłowa";
    }

    modalParagraph.innerHTML = information;
    this.modalWindow.toggle();
  }


  restartQuiz = () => {
    this.currentQuestionIndex = -1;
    this.userCorrectAnswersNum = 0;
    this.userBadAnswersNum = 0;

    this.setUserStats();
    this.setNextQuestionData();

  }

}

const quiz = new Quiz();