let profile = document.createElement("div");
profile.id = "profile";

document.getElementById("headertext").innerText = "Profile";

profile.innerHTML = `
<div class="vbox">
  <div class="hbox sectionheader">
    <p>Groups</p>
    <button>Arrow</button>
  </div>
  <div class="hbar"></div>
  <div class="hbox" id="groupssection">
    <div class="card">
      <img></img>
      <p>Group 1</p>
    </div>
    <div class="card">
      <img></img>
      <p>Group 2</p>
    </div>
    <div class="card">
      <img></img>
      <p>Group 4</p>
    </div>
    <div class="card">
      <img></img>
      <p>Group 5</p>
    </div>
    <div class="card">
      <img></img>
      <p>Group 6</p>
    </div>
  </div>
</div>

<div class="vbox">
  <div class="hbox sectionheader">
    <p>My Polls</p>
    <button>Arrow</button>
  </div>
  <div class="hbar"></div>
</div>

<div class="vbox">
  <div class="hbox sectionheader">
    <p>Favourite Polls</p>
    <button>Arrow</button>
  </div>
  <div class="hbar"></div>
</div>
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

#profile .sectionheader{
  width: 80%;
  height: 3rem;
  justify-content: space-between;
}

#profile #groupssection{
  flex-wrap: wrap;
}
`;

profile.append(profileStyle);
document.getElementById("contentspace").append(profile);
