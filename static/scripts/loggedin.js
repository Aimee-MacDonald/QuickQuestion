let request = new XMLHttpRequest();
request.onerror = () => {console.log("Error")};
request.open("get", "/api/getRandom", true);
request.withCredentials = true;
request.setRequestHeader('CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
request.setRequestHeader('Content-Type', "Application/json");
request.onload = () => {
  if(request.readyState === 4 && request.status === 200){
    let polldata = JSON.parse(request.responseText);

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
};
request.send();

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
