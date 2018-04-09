let menu = document.createElement("div");
menu.id = "menu";

let style = document.createElement("style");
style.innerText = `
#menu button{
  background: blue;
}`;
menu.append(style);

let emailLabel = document.createElement("label");
emailLabel.innerText = "Email";
menu.append(emailLabel);

let emailField = document.createElement("input");
menu.append(emailField);

let passwordLabel = document.createElement("label");
passwordLabel.innerText = "Password";
menu.append(passwordLabel);

let passwordField = document.createElement("input");
menu.append(passwordField);

let submitButton = document.createElement("button");
submitButton.innerText = "Log in";
menu.append(submitButton);

let orp = document.createElement("p");
orp.innerText = "- or -";
menu.append(orp);

let toggleButton = document.createElement("button");
toggleButton.innerText = "Register";
menu.append(toggleButton);

document.getElementById("menuspace").append(menu);
