window.addEventListener("hashchange", hash => {
  switch(location.hash){
    case "#register":
      document.getElementById("login-form").style.display = "none";
      document.getElementById("register-form").style.display = "block";
      break;

    case "#login":
      document.getElementById("register-form").style.display = "none";
      document.getElementById("login-form").style.display = "block";
      break;
  }
});

let loginflag = document.getElementById("loginflag").innerText;
if(loginflag === "true"){
  document.getElementById("register-button").style.display = "none";
  document.getElementById("login-button").style.display = "none";
  document.getElementById("logout-button").style.display = "block";
} else {
  document.getElementById("logout-button").style.display = "none";
  document.getElementById("register-button").style.display = "block";
  document.getElementById("login-button").style.display = "block";
}

let polldata = {
  question: "What is your Preferred Programming Language?",
  answers: [
    {answer: "Java", result: 10},
    {answer: "C++", result: 20},
    {answer: "JavaScript", result: 10},
    {answer: "Python", result: 10}
  ],
  total: 50
}

document.getElementById("question").innerText = polldata.question;
polldata.answers.forEach(i => {
  let newAnswer = document.createElement("li");
  let newButton = document.createElement("button");
  let newBar = document.createElement("div");
  let newResult = document.createElement("p");

  newAnswer.classList.add("answer");
  newBar.classList.add("progress-bar");
  newResult.classList.add("result");

  newButton.innerText = i.answer;
  newResult.innerText = i.result + "/" + polldata.total;

  newAnswer.append(newButton);
  newAnswer.append(newBar);
  newAnswer.append(newResult);

  document.getElementById("answers").append(newAnswer);
});

function showResults(){
  let resultsToggle = document.getElementById("resultsToggle");
  resultsToggle.onclick = hideResults;
  resultsToggle.innerText = "Hide Results";
  document.getElementById("answers").classList.add("answers-revealed");
}

function hideResults(){
  let resultsToggle = document.getElementById("resultsToggle");
  resultsToggle.onclick = showResults;
  resultsToggle.innerText = "Show Results";
  document.getElementById("answers").classList.remove("answers-revealed");
}

function addAnswer(){
  let ans = document.createElement("input");
  ans.type = "text";
  ans.placeholder = "Poll Answer";

  document.getElementById("new-poll-answers").append(ans);
}

function newPoll(){
  let poll = {
    question: document.getElementById("new-poll-question").value,
    answers: []
  }

  document.getElementById("new-poll-answers").childNodes.forEach(i => {
    poll.answers.push(i.value);
  });

  let csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  let request = new XMLHttpRequest();
  request.onload = () => {console.log("Success")};
  request.onerror = () => {console.log("Error")};
  request.open("post", "/api/new", true);
  request.withCredentials = true;
  request.setRequestHeader('CSRF-Token', csrftoken);
  request.setRequestHeader('Content-Type', "Application/json");
  request.send(JSON.stringify(poll));
}
