let privacyNotice = document.createElement("div");
privacyNotice.id = "pn";

document.getElementById("headertext").innerText = "Privacy Notice";

privacyNotice.innerHTML = `
<p>This is a notice about your privacy</P>
`;

let pnStyle = document.createElement("style");
pnStyle.innerText = `
#pn{
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  transition: height 0.5s;
}
`;

privacyNotice.append(pnStyle);
document.getElementById("contentspace").append(privacyNotice);
