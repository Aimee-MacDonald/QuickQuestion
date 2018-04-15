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

  setPollAnswers();

  window.addEventListener("hashchange", () => {
    contentspace.childNodes.forEach(n => {
      n.style.height = "0%";
    });

    switch(location.hash){
      case "#tos":
        setTos();
        break;

      case "#pn":
        setPn();
        break;

      case "profile":
        console.log("profile");
        break;

      default:
        setPollAnswers();
        break;
    }
  });
}

function setTos(){
  let tos = document.getElementById("tos");
  if(tos){
    tos.style.height = "100%";
    document.getElementById("headertext").innerText = "Terms Of Service";
  } else {
    let t = document.createElement("script");
    t.src = "scripts/termsofservice.js";
    contentspace.append(t);
  }
}

function setPn(){
  let pn = document.getElementById("pn");
  document.getElementById("headertext").innerText = "Privacy Notice";
  if(pn){
    pn.style.height = "100%";
  } else {
    let p = document.createElement("script");
    p.src = "scripts/privacynotice.js";
    contentspace.append(p);
  }
}

function setPollAnswers(){
  let answers = document.getElementById("answers");

  if(answers){
    answers.style.height = "100%";
    document.getElementById("headertext").innerText = polldata.title;
  } else {
    let a = document.createElement("script");
    a.src = "scripts/answers.js";
    contentspace.append(a);
  }
}

function loadMenu(){
  let sc = document.createElement("script");
  sc.src = (authflag === "true") ? "scripts/magicmenu.js" : "scripts/loginmenu.js";
  menuspace.append(sc);
}
