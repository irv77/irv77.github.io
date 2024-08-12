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