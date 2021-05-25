const limit = 2;
const clientId = "l8v669ong3mcmzuafjnny8y0tcj9vp";
const apiUrl = "https://api.twitch.tv/kraken";

let xhr = new XMLHttpRequest();
xhr.open("GET", `${apiUrl}/streams?limit=10`, true);
xhr.setRequestHeader("Client-ID", clientId);
xhr.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json");
xhr.send();

xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let date = JSON.parse(this.responseText);
    console.log(date);
    getdata(date);
  }
};

function getdata(data) {
  let res = data.streams;
  for (let eachbox of res) {
    $("#main").append(insertcol(eachbox));
  }
}

function insertcol(eachbox) {
  return `<div class="col-4" onclick="openurl('${eachbox.channel.url}')">
          <div class="video">
            <img src="./images/frame.jpg" alt="" />
            <img src=${eachbox.preview.large}  onload='this.style.opacity=1'/>
          </div>
          <div class="detail">
            <div class="detail_person">
              <img src="./images/person.jpg" alt="" />
              <img src=${eachbox.channel.logo} onload='this.style.opacity=1'/>
            </div>
            <div class="detail_title">
              <p>${eachbox.channel.game}</p>
              <p>${eachbox.channel.display_name}</p>
            </div>
          </div>
        </div>`;
}

function openurl(url) {
  // console.log(url);
  window.open(url, "_blank");
}
