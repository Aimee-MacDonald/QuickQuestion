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
