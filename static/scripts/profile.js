let profile = document.createElement("div");
profile.id = "profile";

document.getElementById("headertext").innerText = "Profile";

profile.innerHTML = `
<p>This is Your Profile</P>
`;

let profileStyle = document.createElement("style");
profileStyle.innerText = `
#profile{
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  transition: height 0.5s;
}
`;

profile.append(profileStyle);
document.getElementById("contentspace").append(profile);
