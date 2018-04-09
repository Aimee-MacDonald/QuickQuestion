let landingPoll = document.getElementById("landing-poll").innerText;
document.getElementById("landing-poll").innerText = "";

if(landingPoll){
  updatePoll(JSON.parse(landingPoll));
} else {
  nextPoll();
}

function nextPoll(){
  document.getElementById("answers").classList = "";
  document.getElementById("show-results").style.display = "block";

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
  document.getElementById("answers").innerText = "";
  document.getElementById("hpid").value = polldata.pollid;

  polldata.answers.forEach(i => {
    let newAnswer = document.createElement("li");
    let newButton = document.createElement("button");
    let newBar = document.createElement("div");
    let resbar = document.createElement("div");
    let newResult = document.createElement("p");

    newAnswer.classList.add("answer");
    newBar.classList.add("progress-bar");
    resbar.classList.add("progress");
    newResult.classList.add("result");

    newButton.innerText = i.answer;
    newResult.innerText = i.score + "/" + polldata.total;

    resbar.style.width = parseInt((i.score / polldata.total) * 100) + "%";

    newBar.append(resbar);
    newAnswer.append(newButton);
    newAnswer.append(newBar);
    newAnswer.append(newResult);

    document.getElementById("answers").append(newAnswer);
  });

  document.getElementById("answers").addEventListener("click", (e) => {
    vote(e.target.innerText);
  });

  loadComments();
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

function share(){
  let link = document.createElement("p");
  link.innerText = "https://quickquestion.glitch.me" + "?pollid=" + pollid.innerText;
  document.getElementById("share").append(link);
}

function loadComments(){
  let pollid = document.getElementById("pollid").innerText;

  let request = new XMLHttpRequest();
  request.onerror = () => {console.log("Error Response")};
  request.open("get", "/api/getComments?pollid=" + pollid, true);
  request.withCredentials = true;
  request.setRequestHeader('CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
  request.setRequestHeader('Content-Type', "Application/json");
  request.onload = () => {
    if(request.readyState === 4 && request.status === 200){
      JSON.parse(request.responseText).comments.forEach(c => {
        let newComment = document.createElement("div");
        newComment.classList.add("comment");
        let newCommentP = document.createElement("p");
        newCommentP.innerText = c.username + ": " + c.comment;
        newComment.append(newCommentP);
        document.getElementById("comments").append(newComment);
      });
    };
  };

  request.send();
}

let reg = false;
function formToggle(){
  reg = !reg;

  if(reg){
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "flex";
  } else {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "flex";
  }
}

let sc = document.createElement("script");
sc.src = ("scripts/loginmenu.js");
document.getElementById("menuspace").append(sc);
