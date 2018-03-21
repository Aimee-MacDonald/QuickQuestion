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
  polldata.answers.forEach(i => {
    let newAnswer = document.createElement("li");
    let newButton = document.createElement("button");
    let newBar = document.createElement("div");
    let newResult = document.createElement("p");

    newAnswer.classList.add("answer");
    newBar.classList.add("progress-bar");
    newResult.classList.add("result");

    newButton.innerText = i;
    newResult.innerText = i.result + "/" + polldata.total;

    newAnswer.append(newButton);
    newAnswer.append(newBar);
    newAnswer.append(newResult);

    document.getElementById("answers").append(newAnswer);
  });
}

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

let modalOpen = false;
function loginout(){
  if(modalOpen){
    document.getElementById("login-register").style.display = "none";
  } else {
    document.getElementById("login-register").style.display = "flex";
  }

  modalOpen = !modalOpen;
}
