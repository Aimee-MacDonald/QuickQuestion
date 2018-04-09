document.getElementById("menuspace").innerHTML = "";

let menu = document.createElement("div");
menu.classList.add("vbox");
menu.id = "menu";

menu.innerHTML = `
<p>This is some text</p>

<div class="vbox">
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

<div class="vbox">
  <label>Confirm Password</label>
  <input></input>
</div>

<button>Log in</button>
<p>- or -</p>
<button>Register</button>

<div id="socialLogins" class="hbox">
  <button class="socialButton"><i class="fab fa-twitter"></i></button>
  <button class="socialButton"><i class="fab fa-facebook-f"></i></button>
  <button class="socialButton"><i class="fab fa-google"></i></button>
</div>
`;

let style = document.createElement("style");
style.innerText = `
#menu button{
  background: transparent;
  border: none;
  width: 80%;
  height: 3rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 2rem;
  color: #c751f4;
  font-weight: bold;
}

#menu button:hover{
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

#menu{
  width: 100%;
  height: 100%;
  justify-content: space-around;
  font-size: 1.5rem;
}

#menu #socialLogins{
  height: 3rem;
  justify-content: space-around;
}
`;

menu.append(style);

document.getElementById("menuspace").append(menu);
