let privacyNotice = document.createElement("div");
privacyNotice.id = "privacynotice";

document.getElementById("headertext").innerText = "Privacy Notice";

privacyNotice.innerHTML = `
<p>This is a notice about your privacy</P>
`;

let pnStyle = document.createElement("style");
pnStyle.innerText = `
#privacynotice{
  background: red;
}
`;

privacyNotice.append(pnStyle);
document.getElementById("contentspace").append(privacyNotice);
