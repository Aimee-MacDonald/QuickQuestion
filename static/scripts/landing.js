let landingPoll = document.getElementById("landing-poll").innerText;

if(landingPoll){
  updatePoll(JSON.parse(landingPoll));
} else {
  let request = new XMLHttpRequest();
  request.onerror = () => {console.log("Error Response")};
  request.open("get", "/api/getRandom", true);
  request.withCredentials = true;
  request.setRequestHeader('CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
  request.setRequestHeader('Content-Type', "Application/json");
  request.onload = () => {
    if(request.readyState === 4 && request.status === 200){
      updatePoll(JSON.parse(request.responseText));
    };
  };
  request.send();
}

function updatePoll(polldata){
  document.getElementById("question").innerText = polldata.question;
  document.getElementById("pollid").innerText = polldata.pollid;

  polldata.answers.forEach(i => {
    let newAnswer = document.createElement("li");
    let newButton = document.createElement("button");
    let newBar = document.createElement("div");
    let newResult = document.createElement("p");

    newAnswer.classList.add("answer");
    newBar.classList.add("progress-bar");
    newResult.classList.add("result");

    newButton.innerText = i.answer;
    newResult.innerText = i.score + "/" + polldata.total;

    newAnswer.append(newButton);
    newAnswer.append(newBar);
    newAnswer.append(newResult);

    document.getElementById("answers").append(newAnswer);
  });

  document.getElementById("answers").addEventListener("click", (e) => {
    vote(e.target.innerText);
  });
}

function showResults(){
  document.getElementById("show-results").style.display = "none";
  document.getElementById("answers").classList.add("answers-revealed");
}

let modalOpen = false;
function loginout(){
  if(modalOpen){
    document.getElementById("login-register").style.display = "none";
  } else {
    document.getElementById("login-register").style.display = "flex";
  }

  modalOpen = !modalOpen;
}

function vote(option){
  let pac = JSON.stringify({
    'pollid': document.getElementById("pollid").innerText,
    'choice': option
  });

  let request = new XMLHttpRequest();
  request.onerror = () => {console.log("Error Response")};
  request.open("post", "/api/vote", true);
  request.withCredentials = true;
  request.setRequestHeader('CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
  request.setRequestHeader('Content-Type', "Application/json");
  request.onload = () => {console.log("Success")};
  request.send(pac);

  showResults();
}
