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
