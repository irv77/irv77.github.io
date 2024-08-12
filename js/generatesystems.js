const container = document.getElementById("search");

fetch("games/tiles/links.json")
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
      link.className = "system-link";

      const gameTile = document.createElement("div");
      gameTile.className = "system-tile";

      const icon = document.createElement("img");
      icon.className = "system-icon";
      icon.src = game[1];
      icon.loading = "lazy";

      const gameText = document.createElement("div");
      gameText.className = "system-text";

      const title = document.createElement("h1");
      title.className = "system-title";
      title.innerHTML = game[0];

      const gameDesc = document.createElement("p");
      gameDesc.className = "system-desc";
      gameDesc.innerHTML = game[3];

      gameTile.appendChild(icon);
      gameTile.appendChild(gameText);
      gameText.appendChild(title);
      gameText.appendChild(gameDesc);

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
  console.log("Generated " + tileCount + " System tiles.");
}