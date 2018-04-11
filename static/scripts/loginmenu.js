document.getElementById("menuspace").innerHTML = "";

let menu = document.createElement("div");
menu.classList.add("vbox");
menu.id = "menu";

menu.innerHTML = `
<p>Sign up now to start creating and sharing your own polls.</p>

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

<a href="#">Log in</a>
<p>- or -</p>
<a href="#">Register</a>

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

#menu{
  width: 100%;
  height: 100%;
  justify-content: space-around;
  font-size: 1.5rem;
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
