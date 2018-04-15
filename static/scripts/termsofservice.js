let termsOfService = document.createElement("div");
termsOfService.id = "termsofservice";

document.getElementById("headertext").innerText = "Terms Of Service";

termsOfService.innerHTML = `
<p>These are our terms of service.</P>
`;

let tosStyle = document.createElement("style");
tosStyle.innerText = `
#termsofservice{
  background: red;
}
`;

termsOfService.append(tosStyle);
document.getElementById("contentspace").append(termsOfService);
