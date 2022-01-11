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


  init() {
    this.heading = document.querySelector(".alert-heading")
    this.answer0 = document.querySelector("#answer0");
    this.answer1 = document.querySelector("#answer1");
    this.answer2 = document.querySelector("#answer2");
    this.querySelector = document.querySelector("#questionParagraph");

    this.saveAnswerButton = document.querySelector("#saveAnswerButton");
    this.nextQuestionButton = document.querySelector("#nextQuestionButton");

    this.setNextQuestionData();
  }

  setNextQuestionData = () => {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      console.log("koniec quizu");
      return;
    }
  }


}

const quiz = new Quiz();