let pollid = document.getElementById("pollid").innerText;

let polldata = {
  "title": "What is your Favourite City?",
  "stats": {
    "creation": {
      "author": "Aimee",
      "date": "11-April-2018"
    },
    "hearts": 8,
    "comments": 2
  },
  "answers": [{
    "answer": "Tokyo",
    "image": "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1488208675%2Ftokyo-japan-FDEALS0217.jpg%3Fitok%3DVpaGmPRS&w=800&q=85",
    "votes": 6
  },{
    "answer": "London",
    "image": "https://cdn.londonandpartners.com/assets/73295-640x360-london-skyline-ns.jpg",
    "votes": 7
  },{
    "answer": "New York",
    "image": "https://media.timeout.com/images/103444978/750/422/image.jpg",
    "votes": 10
  }]
}

window.onload = function(){
  if(pollid === "0"){
    console.log("Get a random Poll");
  } else {
    console.log("Get poll number " + pollid);
  }

  setPoll(polldata);

  window.addEventListener("hashchange", () => {
    let contentspace = document.getElementById("contentspace");
    contentspace.childNodes.forEach(n => {
      n.style.height = "0%";
    });

    switch(location.hash){
      case "#tos":
        let tos = document.getElementById("tos");
        if(tos){
          console.log(tos);
        } else {
          console.log("notos");
          let newtos = document.createElement("div");
          newtos.id = "tos";
          newtos.innerText = "Terms of Service";
          contentspace.append(newtos);
        }
        break;

      case "#pn":
        let pn = document.getElementById("pn");
        if(pn){
          console.log(pn);
        } else {
          console.log("nopn");
          let newpn = document.createElement("div");
          newpn.id = "pn";
          newpn.innerText = "Privacy Notice";
          contentspace.append(newpn);
        }
        break;

      case "profile":
        console.log("profile");
        break;
    }
  });
}

function setPoll(polldata){
  document.getElementById("answers").innerText = "";

  // Set Title
  let headerspace = document.getElementById("headerspace");
  headerspace.innerText = "";
  let header = document.createElement("p");
  header.innerText = polldata.title;
  headerspace.append(header);

  // Set Author
  let author = document.getElementById("author");
  author.innerText = "";
  let authorname = document.createElement("p");
  authorname.innerText = polldata.stats.creation.author;
  let date = document.createElement("p");
  date.innerText = polldata.stats.creation.date;
  author.append(authorname);
  author.append(date);

  // Set Hearts
  let hearts = document.getElementById("hearts");
  hearts.innerText = "";
  let numHearts = document.createElement("p");
  numHearts.innerText = polldata.stats.hearts;
  hearts.append(numHearts);

  // Set Comments
  let comments = document.getElementById("comments");
  comments.innerText = "";
  let numComments = document.createElement("p");
  numComments.innerText = polldata.stats.comments;
  comments.append(numComments);

  // Set Answers
  polldata.answers.forEach(a => {
    let answer = document.createElement("div");
    answer.classList.add("vbox");
    answer.classList.add("answer");

    let answerImage = document.createElement("img");
    answerImage.src = a.image;
    answer.append(answerImage);

    let answerText = document.createElement("p");
    answerText.innerText = a.answer;
    answer.append(answerText);

    document.getElementById("answers").append(answer);
  });
}

// Load Menu
if(document.getElementById("authflag").innerText === "true"){
  let sc = document.createElement("script");
  sc.src = ("scripts/magicmenu.js");
  document.getElementById("menuspace").append(sc);
} else {
  let sc = document.createElement("script");
  sc.src = ("scripts/loginmenu.js");
  document.getElementById("menuspace").append(sc);
}

/*
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
*/
