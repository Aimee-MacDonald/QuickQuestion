document.getElementById("menuspace").innerText = "";

let magicmenu = document.createElement("div");
magicmenu.classList.add("vbox");
magicmenu.id = "magicmenu";

magicmenu.innerHTML = `
<a href="#profile">My Profile</a>
<a href="auth/logout">Log Out</a>
`;

let mmstyle = document.createElement("style");
mmstyle.innerText = `
#magicmenu a{
  background: red;
}
`;

magicmenu.append(mmstyle);
document.getElementById("menuspace").append(magicmenu);
