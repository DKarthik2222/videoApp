$(document).ready(function () {
  var playlistData = [];
  var logout = document.getElementById("logout");
  logout.onclick = () => {
    window.location.assign("./index.html");
  };
  var videoPlaySectionData = [];
  var videoLOadStatus = false;
  var httpx = new XMLHttpRequest();
  httpx.open(
    "GET",
    "https://5fc0748dfd14be0016749cfe.mockapi.io/karthik/videoplaydata/",
    false
  );
  httpx.onreadystatechange = function () {
    if (this.readyState === 4) {
      videoPlaySectionData = JSON.parse(this.responseText);
      videoLOadStatus = true;
      showData();
    }
  };
  showData = () => {
    document.getElementById("loader").style.display = "none";
  };
  httpx.send();
  function createPlaylistCard(obj, pos) {
    var cardWrapper = document.createElement("a");
    cardWrapper.className = "card-wrapper";
    cardWrapper.href = "./player.html?id=" + videoPlaySectionData[pos].vimeoId;
    var mainDiv = document.createElement("div");
    mainDiv.id = "card" + obj.id;
    mainDiv.className = "playlist-card";

    var thumbnail = document.createElement("img");
    thumbnail.src = obj.thumbnail;
    thumbnail.className = "thumbnail";

    var title = document.createElement("h3");
    title.className = "video-card-title";
    title.innerHTML = obj.title;

    mainDiv.appendChild(thumbnail);
    mainDiv.appendChild(title);

    if (pos === 0) {
      mainDiv.classList.add("active-card");
    }
    mainDiv.onclick = () => {
      $(".playlist-card").removeClass("active-card");
      mainDiv.classList.add("active-card");
    };
    cardWrapper.appendChild(mainDiv);
    return cardWrapper;
  }
  if (videoLOadStatus == true) {
    var http = new XMLHttpRequest();
    http.open(
      "GET",
      "https://5fc0748dfd14be0016749cfe.mockapi.io/karthik/videodata",
      false
    );
    http.onreadystatechange = function () {
      if (this.readyState === 4) {
        playlistData = JSON.parse(this.responseText);
        for (var i = 0; i < playlistData.length; i++) {
          var card = createPlaylistCard(playlistData[i], i);
          document.getElementById("playlist-wrapper").appendChild(card);
        }
      }
    };
    http.send();
  }
});
