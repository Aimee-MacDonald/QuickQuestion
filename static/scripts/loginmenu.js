document.getElementById("menuspace").innerHTML = "";

let menu = document.createElement("div");
menu.classList.add("vbox");
menu.id = "menu";

menu.innerHTML = `
<p>Sign up now to start creating and sharing your own polls.</p>

<div class="vbox", id="inputs">
  <div class="vbox", id="namefield">
    <label>Name</label>
    <input placeholder="Joe" type="text" id="name"></input>
  </div>

  <div class="vbox">
    <label>Email</label>
    <input placeholder="joesoap@gmail.com" type="email" id="email"></input>
  </div>

  <div class="vbox">
    <label>Password</label>
    <input placeholder="*****" type="password" id="password"></input>
  </div>

  <div class="vbox", id="confirmpwdfield">
    <label>Confirm Password</label>
    <input placeholder="*****" type="password" id="confirmPassword"></input>
  </div>
</div>

<div class="vbox", id="buttons">
  <button onclick="submitForm()", id="loginbtn">Log in</button>
  <p>- or -</p>
  <button onclick="toggleLoginRegister()", id="registerbtn">Register</button>
</div>

<div id="socialLogins" class="hbox">
  <a href="#" class="socialButton"><i class="fab fa-twitter"></i></a>
  <a href="#" class="socialButton"><i class="fab fa-facebook-f"></i></a>
  <a href="#" class="socialButton"><i class="fab fa-google"></i></a>
</div>

<div class="vbox", id="legal">
  <a href="#tos", class="smallLink">Terms of Service</a>
  <a href="#pn", class="smallLink">Privacy Notice</a>
</div>
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

#menu p{
  font-size: 2rem;
}

#menu #inputs{
  align-items: center;
}

#menu #inputs div{
  margin: 0.5rem 0;
}

#menu #buttons{
  align-items: center;
}

#menu button{
  background: transparent;
  border: none;
  width: 80%;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 0;
  margin: 1.5rem 0;
  border-radius: 5px;
  color: #c751f4;
  transition: background 0.4s;
}

#menu button:hover{
  background: #66da89;
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
  transition: background 0.4s;
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
  text-align: center;
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
}

#menu #legal{
  align-items: center;
}
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
    registerbtn.setAttribute("onclick", "submitForm()");
  } else {
    document.getElementById("namefield").style.width = "0%";
    document.getElementById("confirmpwdfield").style.width = "0%";

    loginbtn.style.order = "-1";
    registerbtn.style.order = "1";

    loginbtn.setAttribute("onclick", "submitForm()");
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

function submitForm(){
  if(registerToggle){
    let request = new XMLHttpRequest();
    request.onerror = () => {console.log("Error Response")};
    request.open("post", "/auth/register", true);
    //request.withCredentials = true;
    request.setRequestHeader('CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
    request.setRequestHeader('Content-Type', "Application/json");
    request.onload = () => {
      if(request.readyState === 4){
        switch(request.status){
          case 200:
            let menuspace = document.getElementById("menuspace");
            let spinner = document.createElement("div");
            spinner.classList.add("spinner");
            menuspace.innerText = "";
            menuspace.append(spinner);
            let magicmenu = document.createElement("script");
            magicmenu.src = "scripts/magicmenu.js";
            menuspace.append(magicmenu);
            break;

          case 422:
            console.log("User Already Exists");
            break;
        }
      };
    };

    request.send(JSON.stringify({
      "name": document.getElementById("name").value,
      "email": document.getElementById("email").value,
      "password": document.getElementById("password").value,
      "confirmPassword": document.getElementById("confirmPassword").value
    }));
  } else {
    let request = new XMLHttpRequest();
    request.onerror = () => {console.log("Error Response")};
    request.open("post", "/auth/login", true);
    //request.withCredentials = true;
    request.setRequestHeader('CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
    request.setRequestHeader('Content-Type', "Application/json");
    request.onload = () => {
      if(request.readyState === 4){
        switch(request.status){
          case 200:
            let menuspace = document.getElementById("menuspace");
            let spinner = document.createElement("div");
            spinner.classList.add("spinner");
            menuspace.innerText = "";
            menuspace.append(spinner);
            let magicmenu = document.createElement("script");
            magicmenu.src = "scripts/magicmenu.js";
            menuspace.append(magicmenu);
            break;

          case 401:
            console.log("Wrong Credentials");
            break;

          case 404:
            console.log("No Such User");
            break;
        }
      };
    };

    request.send(JSON.stringify({
      "email": document.getElementById("email").value,
      "password": document.getElementById("password").value
    }));
  }
}
