document.getElementById("menuspace").innerHTML = "";

let menu = document.createElement("div");
menu.classList.add("vbox");
menu.id = "menu";

menu.innerHTML = `
<p>Sign up now to start creating and sharing your own polls.</p>

<div class="vbox", id="namefield">
  <label>Name</label>
  <input></input>
</div>

<div class="vbox">
  <label>Email</label>
  <input></input>
</div>

<div class="vbox">
  <label>Password</label>
  <input></input>
</div>

<div class="vbox", id="confirmpwdfield">
  <label>Confirm Password</label>
  <input></input>
</div>

<div class="vbox">
  <button onclick="submit()", id="loginbtn">Log in</button>
  <p>- or -</p>
  <button onclick="toggleLoginRegister()", id="registerbtn">Register</button>
</div>

<div id="socialLogins" class="hbox">
  <a href="#" class="socialButton"><i class="fab fa-twitter"></i></a>
  <a href="#" class="socialButton"><i class="fab fa-facebook-f"></i></a>
  <a href="#" class="socialButton"><i class="fab fa-google"></i></a>
</div>

<a href="#", class="smallLink">Terms of Service</a>
<a href="#", class="smallLink">Privacy Notice</a>
`;

let style = document.createElement("style");
style.innerText = `
#menu{
  color: #c751f4;
  text-align: center;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  font-size: 1.5rem;
}

#menu a{
  background: transparent;
  width: 80%;
  height: 3rem;
  border-radius: 5px;
  font-size: 2rem;
  color: #c751f4;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

#menu a:hover{
  background: #66da89;
  color: black;
}

#menu div{
  width: 90%;
  align-items: flex-start;
}

#menu input{
  width: 100%;
  height: 2rem;
  background: #c751f4;
  border-color: #c751f4;
  border-radius: 5px;
  font-size: 1.5rem;
}

#menu #namefield{
  width: 0%;
  overflow: hidden;
  transition: width 0.5s;
}

#menu #confirmpwdfield{
  width: 0%;
  overflow: hidden;
  transition: width 0.5s;
}


#menu #socialLogins{
  height: 3rem;
  width: 60%;
  justify-content: space-around;
}

#menu #socialLogins a{
  font-size: 1.2rem;
}

#menu .smallLink{
  font-size: 1rem;
`;

menu.append(style);
document.getElementById("menuspace").append(menu);

let registerToggle = false;
function toggleLoginRegister(){
  registerToggle = !registerToggle;

  let loginbtn = document.getElementById("loginbtn");
  let registerbtn = document.getElementById("registerbtn");

  let loginClip1 = loginbtn.getBoundingClientRect();
  let registerClip1 = registerbtn.getBoundingClientRect();

  if(registerToggle){
    document.getElementById("namefield").style.width = "90%";
    document.getElementById("confirmpwdfield").style.width = "90%";

    loginbtn.style.order = "1";
    registerbtn.style.order = "-1";

    loginbtn.setAttribute("onclick", "toggleLoginRegister()");
    registerbtn.setAttribute("onclick", "submit()");
  } else {
    document.getElementById("namefield").style.width = "0%";
    document.getElementById("confirmpwdfield").style.width = "0%";

    loginbtn.style.order = "-1";
    registerbtn.style.order = "1";

    loginbtn.setAttribute("onclick", "submit()");
    registerbtn.setAttribute("onclick", "toggleLoginRegister()");
  }

  let loginClip2 = loginbtn.getBoundingClientRect();
  let registerClip2 = registerbtn.getBoundingClientRect();

  const loginDelta = loginClip1.top - loginClip2.top;
  const registerDelta = registerClip1.top - registerClip2.top;

  loginbtn.animate([
    { transform: 'translateY(' + loginDelta + 'px)' },
    { transform: 'translateY(0px)' }
  ], {
    duration: 500,
    iterations: 1,
    fill: "forwards"
  });

  registerbtn.animate([
    { transform: 'translateY(' + registerDelta + 'px)' },
    { transform: 'translateY(0px)' }
  ], {
    duration: 500,
    iterations: 1,
    fill: "forwards"
  });
}
