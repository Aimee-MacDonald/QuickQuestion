let pollid = document.getElementById("pollid").innerText;
let authflag = document.getElementById("authflag").innerText;
let contentspace = document.getElementById("contentspace");
let headerspace = document.getElementById("headerspace");
let menuspace = document.getElementById("menuspace");

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
  loadMenu();

  if(pollid === "0"){
    console.log("Get a random Poll");
  } else {
    console.log("Get poll number " + pollid);
  }

  setPoll(polldata);

  window.addEventListener("hashchange", () => {
    contentspace.childNodes.forEach(n => {
      n.style.height = "0%";
    });

    switch(location.hash){
      case "#tos":
        let tos = document.getElementById("tos");
        if(tos){
          tos.style.height = "100%";
        } else {
          console.log("notos");
          let newtos = document.createElement("div");
          newtos.id = "tos";
          newtos.classList.add("vbox");
          newtos.innerText = "Terms of Service";
          contentspace.append(newtos);
        }
        break;

      case "#pn":
        let pn = document.getElementById("pn");
        if(pn){
          pn.style.height = "100%";
        } else {
          console.log("nopn");
          let newpn = document.createElement("div");
          newpn.id = "pn";
          newpn.classList.add("vbox");
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

function loadMenu(){
  let sc = document.createElement("script");
  sc.src = (authflag === "true") ? "scripts/magicmenu.js" : "scripts/loginmenu.js";
  menuspace.append(sc);
}
