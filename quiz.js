let quizDatas = "quiz.json";
let container_one = document.querySelector("#one");
let container_two = document.querySelector("#two");
let container_three = document.querySelector("#three");
let container_four = document.querySelector("#four");
let wrapper_questions = document.querySelector(".wrapper_questions");

let correctAnswers = [];

// create possible Answers:
function answers(answerOptions) {
  let temp = ``;
  answerOptions.forEach((options) => {
    let nameOption = convertingOptionName(options);

    temp += `<div id="checkbox-container">
    <label for="${nameOption}" class="checkbox-label">
        <input type="checkbox"  id="${nameOption}">${options}
        <span class="checkbox-custom circular"></span>
    </label>
</div>`;
  });
  return temp;
}

// Converting f-ja:
function convertingOptionName(option) {
  return option.split(" ").join("_");
}

// create Quiz Questions:
// Question One:
function quizQuestionOne(quiz) {
  quiz.forEach((question) => {
    let questionOne = question[1].q1.question;
    let answerOptionsOne = question[1].q1.options;
    let questionOPtions = answers(answerOptionsOne);
    container_one.innerHTML = `<h4>${questionOne}</h4>${questionOPtions}`;
  });
}

// QuestionTwo:
function quizQuestionsTwo(quiz) {
  quiz.forEach((question) => {
    let questionTwo = question[1].q2.question;
    let answerOptions = question[1].q2.options;
    let questionOPtions = answers(answerOptions);
    container_two.innerHTML = `<h4>${questionTwo}</h4> ${questionOPtions}`;
  });
}
// QuestionThree:
function quizQuestionsThree(quiz) {
  quiz.forEach((question) => {
    let questionThree = question[1].q3.question;
    let answerOptions = question[1].q3.options;
    let questionOPtions = answers(answerOptions);
    container_three.innerHTML = `<h4>${questionThree}</h4> ${questionOPtions}`;
  });
}
// Questionfour:
function quizQuestionsfour(quiz) {
  quiz.forEach((question) => {
    let questionFour = question[1].q4.question;
    let answerOptions = question[1].q4.options;
    let questionOPtions = answers(answerOptions);
    container_four.innerHTML += `<h4>${questionFour}</h4>${questionOPtions}`;
  });
}

// BUTTONS
let btn = document.querySelector("#display");
let clearBtn = document.querySelector("#clearBtn");

// f-on to set Local-Storage checked inputs
let answersChecked = () => {
  let inputs = document.querySelectorAll("input[type='checkbox']:checked");
  let arrInputs = [];

  // for eachInput
  inputs.forEach((input) => {
    arrInputs.push({
      id: input.id,
      checked: input.checked,
    });
    // Save in LS:
    localStorage.setItem("inputs", JSON.stringify(arrInputs));
    console.log(JSON.stringify(arrInputs));
  });
};

// f-on that clearsStorage:
let clearStorage = () => {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.checked = false;
    localStorage.clear();
  });
};

// BUTTON listeneres:
btn.addEventListener("click", answersChecked);
clearBtn.addEventListener("click", clearStorage);

// set the checked inputs after reloads;
let load = () => {
  let inputs = JSON.parse(localStorage.getItem("inputs"));
  // forEach input:
  inputs.forEach((input) => {
    // Set the 'checked' value
    document.getElementById(input.id).checked = input.checked;
  });
};

window.onload = () => {
  fetch(quizDatas)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Error while rendernig data");
    })
    .then((data) => {
      const quiz = Object.entries(data);
      quizQuestionOne(quiz);
      quizQuestionsTwo(quiz);
      quizQuestionsThree(quiz);
      quizQuestionsfour(quiz);
      load();
    })
    .catch((err) => {
      console.log(`There is an error${err.message}`);
    });
};
