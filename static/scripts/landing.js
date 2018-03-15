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
