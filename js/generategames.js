const container = document.getElementById("search");
const source = document.querySelector('script[data-name="gameTypes"]');

let gameType = source.getAttribute('data-type');

fetch("tiles/links_" + gameType + ".json")
  .then((response) => response.json())
  .then((data) => createGames(data));

function createGames(data) {
  let tileCount = 0;

  for (const gamesList of data.links) {
    const section = document.createElement("section");
    section.className = "flex-container";

    for (const game of gamesList.games) {
      const link = document.createElement("a");
      const cdnUrl = localStorage.getItem("cdnUrl") || "";
      link.href = cdnUrl + game[2];
      link.className = "game-link";

      const gameTile = document.createElement("div");
      gameTile.className = "game-tile";

      const icon = document.createElement("img");
      icon.className = "game-icon";
      icon.src = game[1];
      icon.loading = "lazy";

      const title = document.createElement("h1");
      title.className = "game-title";
      title.innerHTML = game[0];

      const gameDesc = document.createElement("p");
      gameDesc.className = "game-desc";
      gameDesc.setAttribute("placeholder", "No description for this game...");
      gameDesc.innerHTML = game[3];

      gameTile.appendChild(icon);
      gameTile.appendChild(title);
      gameTile.appendChild(gameDesc);

      link.appendChild(gameTile);
      section.appendChild(link);
      tileCount++;

      link.addEventListener("click", function () {
        window.open(url);
        const url = link.href;
      });
      
    }
    const sectiontitle = document.createElement("h2");
    const sectiontitlec = document.createElement("span");
    sectiontitlec.innerHTML = gamesList.title;
    sectiontitle.appendChild(sectiontitlec);
    container.appendChild(sectiontitle);
    container.appendChild(section);
  }
  console.log("Generated " + tileCount + " " + gameType + " game tiles.");
}

function openRandomIframe() {
  const gameLinks = document.querySelectorAll('.game-link');
  const randomIndex = Math.floor(Math.random() * gameLinks.length);
  const randomLink = gameLinks[randomIndex];
  
  const url = randomLink.href;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    // Check if there is an existing iframe and remove it along with the overlay
    window.open(url, '_self');
  } else {
    // The URL is not valid, so display an error message
    alert("Invalid URL: " + url);
  }
}

let createSearch = document.createElement('div');
let contentDiv = document.querySelector('.content');
createSearch.classList.add('searchbar');
createSearch.innerHTML = `
<div class="text-center">
      <a onclick="startSearch()" style="position: relative; left: 4.5vw;"><svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="search">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg></a>
      <input type="text" class="text-center" id="mySearch" onload="startSearch()" onkeyup="startSearch()"
        placeholder="Search for games..." title="Search">
      <a onclick="openRandomIframe()" style="position: relative; left: -4.5vw;"><svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="random">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          <circle cx="8.5" cy="8.5" r=".5" fill="currentColor" />
          <circle cx="15.5" cy="8.5" r=".5" fill="currentColor" />
          <circle cx="15.5" cy="15.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="15.5" r=".5" fill="currentColor" />
          <circle cx="12" cy="12" r=".5" fill="currentColor" />
        </svg></a></a>
    </div>
`;
document.body.insertBefore(createSearch, contentDiv);

if (document.querySelector('.searchbar')) {
window.addEventListener("scroll", function () {
  var searchbar = document.querySelector(".searchbar");
  searchbar.classList.toggle("scrolled", window.scrollY > 0);
});
};

const startSearch = () => {
  const input = document.getElementById("mySearch");
  const filter = input.value.toUpperCase();
  const ul = document.getElementById("search");
  const li = ul.getElementsByTagName("a");

  for (let i = 0; i < li.length; i++) {
    const a = li[i].getElementsByTagName("h1")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};