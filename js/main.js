let limit = 10;
let lang = "zh";
var alldata;
const clientId = "l8v669ong3mcmzuafjnny8y0tcj9vp";
const apiUrl = "https://api.twitch.tv/kraken";

let xhr = new XMLHttpRequest();
var init = function () {
  xhr.open(
    "GET",
    `${apiUrl}/streams?limit=` + limit + "&language=" + lang,
    true
  );
  xhr.setRequestHeader("Client-ID", clientId);
  xhr.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json");
  xhr.send();
};
init();
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let date = JSON.parse(this.responseText);
    console.log(date);
    getdata(date);
  }
};

function getdata(data) {
  let res = data.streams;
  alldata = data.streams;
  $("#title").text(window.I18N[lang].title);
  $("#main").html("");
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

function loadmore() {
  limit += 5;
  init();
  xhr.onreadystatechange();
}
function changelang(e) {
  $("#title").text(window.I18N[e].title);
  lang = e;
  init();
  xhr.onreadystatechange();
}

function search() {
  let val = $(".search input").val();
  $("#main").html("");
  let filterval = alldata.filter((e) => {
    return (
      e.channel.game.indexOf(val) !== -1 ||
      e.channel.display_name.indexOf(val) !== -1
    );
  });
  for (let eachbox of filterval) {
    $("#main").append(insertcol(eachbox));
  }
}
