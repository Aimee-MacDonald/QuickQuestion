let termsOfService = document.createElement("div");
termsOfService.id = "tos";

document.getElementById("headertext").innerText = "Terms Of Service";

termsOfService.innerHTML = `
<p>These are our terms of service.</P>
`;

let tosStyle = document.createElement("style");
tosStyle.innerText = `

#tos{
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  transition: height 0.5s;
}
`;

termsOfService.append(tosStyle);
document.getElementById("contentspace").append(termsOfService);
