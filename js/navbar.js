const style = document.createElement("style");
style.textContent = `
  ::-webkit-scrollbar {
    width: 0.5vw;
    background: #000;
    border-left: 0.1vw solid var(--theme);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--text);
    -webkit-border-radius: 1ex;
  }

  ::-webkit-scrollbar-thumb:hover {
    cursor: grab;
  }

  ::-webkit-scrollbar-thumb:active {
    cursor: grabbing;
  }

  ::-webkit-scrollbar-corner {
    background: var(--background-secondary);
  }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', function () {
  var navbar = document.createElement('div');
  navbar.id = 'navbar';
  navbar.innerHTML = `
  <style>
      /* Navbar CSS */
      #navbar {
        position: fixed;
        top: 2.5%;
        left: 2.5%;
        width: 95%;
        z-index: 9999;
        list-style-type: none;
      }
    
      #navbar #top-bar {
        padding: 2vh 7.5vh;
        background: rgba(0, 0, 0, 0.65) url(/assets/images/overlays/divider.png) no-repeat center;
        border: 0.2vh solid var(--theme);
        border-radius: 10vw;
      }
    
      #navbar #top-bar nav ul {
        display: flex;
        padding: 0;
        margin: 0;
        justify-content: center;
      }
    
      #navbar #top-bar nav ul li {
        margin-left: 1%;
        margin-right: 1%;
        list-style-type: none;
      }
    
      #navbar #top-bar nav ul li a {
        text-decoration: none;
        color: var(--theme-secondary);
        font-weight: bold;
        font-size: 2vw;
        transition: background-color 0.3s ease;
        display: flex;
      }
    
      .theme, .setting {
        margin-top: 0.3vw;
        margin-left: 1%;
        margin-right: 1%;
        width: 3.5vw;
        stroke: var(--theme-tertiary);
      }
    
      path {
        transition: fill 0.3s ease;
      }
    
      .svg {
        width: 2vw;
        vertical-align: top;
        stroke: var(--theme-secondary);
        margin-right: 1vh;
      }

      #navbar #top-bar nav ul li a:hover {
        color: var(--text-secondary);
      }

      .hvuncen a:hover path, .theme:hover path, .setting:hover path {
        stroke: var(--text-secondary);
      }
    
      .logo {
        width: fit-content;
        cursor: pointer;
        display: block;
      }
    
      .navlogo {
        width: 40vw;
        transition: transform 0.1s;
      }

      .navlogo:hover {
        transform: scale(1.025);
      }
    
      .navloader {
        z-index: 9999;
      }

      .hvuncen {
        cursor: pointer;
        z-index: 9999;
        margin-top: 1%;
        height: fit-content;
      }

      .hvuncen:before, .navloader:before {
        content: "";
        position: absolute;
        z-index: -1;
        left: 50%;
        right: 50%;
        bottom: 0;
        background: var(--theme-secondary);
        height: 0.25vh;
        transition-property: left, right;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
        margin: 0 3vw;
      }
      
      .hvuncen:active:before, .hvuncen:focus:before, .hvuncen:hover:before, .navloader:active:before, .navloader:focus:before, .navloader:hover:before {
        left: 0;
        right: 0;
      }
      
      .copy p {
        position: absolute;
        z-index: 2;
        margin: 0;
        padding-bottom: 1vh;
        width: 100%;
        box-shadow: 0 -1vh 2vh 1vh rgba(0, 0, 0, 0.45);
        font-family: "CopyR";
        font-size: 1.5vw;
        background: rgba(0, 0, 0, 0.55);
        color: var(--text);
      }
    
      /* Mobile Navbar CSS */

      #mobile-options {
        display: none;
        justify-content: center;
        align-items: center;
      }

      #mobile-options .navlogo {
        width: 75vw;
      }

      #hamburger-icon {
        cursor: pointer;
        position: absolute;
        right: 3vw;
      }
    
      #hamburger-icon div {
        width: 5vw;
        height: 0.5vw;
        background-color: var(--text);
        margin: 0.75vw 0;
        transition: 0.4s;
      }
      
      .open .bar1 {
        -webkit-transform: rotate(-45deg) translate(-1vw, 1vw);
        transform: rotate(-45deg) translate(-1vw, 1vw);
      }
      
      .open .bar2 {
        opacity: 0;
      }
      
      .open .bar3 {
        -webkit-transform: rotate(45deg) translate(-0.75vw, -0.75vw);
        transform: rotate(45deg) translate(-0.75vw, -0.75vw);
      }
      
      .open.mobile-menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 100vh;
        position: fixed;
      }
      
      .mobile-menu .hvuncen {
        margin-bottom: 5vh;
        height: 5vh;
      }
    
      .mobile-menu .hvuncen:before {
        margin: 0;
      }

      .mobile-menu {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background: var(--background-secondary) url(/assets/images/overlays/overlay-small.png) no-repeat;
        background-size: cover;
        cursor: default;
        z-index: -1;
        margin-top: 0;
        padding: 0;
      }
      
      .mobile-menu li a {
        text-decoration: none;
        color: var(--theme-secondary);
        font-weight: bold;
        font-size: 6vh;
        transition: background-color 0.3s ease;
      }
    
      .mobile-menu li a:hover {
        color: var(--text-secondary);
      }
      
      .mobile-menu li {
        margin-bottom: 3vw;
        list-style-type: none;
      }
      
      .mobile-menu .svg {
        width: 6.5vh;
      }

      @media only screen and (max-width: 900px) {
        div nav {
          display: none;
        }
      
        #mobile-options {
          display: flex;
        }

        .copy p {
        	font-size: 2.5vw;
        	padding-bottom: 1.5vh;
        }
      }

      @media only screen and (max-height: 550px) {
        div nav {
          display: none;
        }
      
        #mobile-options {
          display: flex;
        }
        
        .copy p {
        	font-size: 2.5vw;
        	padding-bottom: 1.5vh;
        }
      }
    
      .scrolling {
        height: 100%;
        overflow: hidden;
      }
    </style>
    <div id="top-bar">
    <nav>
      <ul>
        <li class="navloader"><a href="https://irv77.github.io/pages/themes.html">
          <svg xmlns="http://www.w3.org/2000/svg" class="theme" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path><path d="M21 3a16 16 0 0 0 -12.8 10.2"></path><path d="M21 3a16 16 0 0 1 -10.2 12.8"></path><path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path></svg>
        </a></li>
        <li class="hvuncen"><a href="https://irv77.github.io/index.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
        </svg><span> Home</span></a></li>
        <li class="hvuncen"><a href="https://irv77.github.io/pages/about.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        </svg><span>About</span></a></li>
        <li><a onclick="location.href=&#39;https://discord.gg/xuu8TnSY4b&#39;" draggable="false" class="logo">
          <img src="/assets/images/logos/navbar-logo.png" class="navlogo">
          </a></li>
        <li class="hvuncen"><a href="https://irv77.github.io/pages/games.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z"></path><path d="M6 12h4m-2 -2v4"></path><path d="M15 11l0 .01"></path><path d="M18 13l0 .01"></path>
        </svg><span> Games</span></a></li>
        <li class="hvuncen"><a href="https://irv77.github.io/pages/chat.html"><svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M20 4v8"></path><path d="M16 4.5v7"></path><path d="M12 5v16"></path><path d="M8 5.5v5"></path><path d="M4 6v4"></path><path d="M20 8h-16"></path>
        </svg><span> Extras</span></a></li>
        <li class="navloader"><a href="https://irv77.github.io/pages/settings.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="setting" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M6 4v4"></path><path d="M6 12v8"></path><path d="M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M12 4v10"></path><path d="M12 18v2"></path><path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M18 4v1"></path><path d="M18 9v11"></path>
        </svg>
      </a></li>
      </ul>
    </nav>
    <div id="mobile-options">
    <img src="/assets/images/logos/navbar-logo.png" class="navlogo">
    <div id="hamburger-icon" onclick="toggleMobileMenu(this)">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
    <ul class="mobile-menu">
        <li style="min-height: 18vh; list-style-type: none;"></li>
        <li class="hvuncen"><a href="https://irv77.github.io/index.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke="#f2cf09" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
        </svg><span> Home</span></a></li>
        <li class="hvuncen"><a href="https://irv77.github.io/pages/about.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke="#f2cf09" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        </svg><span> About</span></a></li>
        <li class="hvuncen"><a href="https://irv77.github.io/pages/games.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke="#f2cf09" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z"></path><path d="M6 12h4m-2 -2v4"></path><path d="M15 11l0 .01"></path><path d="M18 13l0 .01"></path>
        </svg><span> Games</span></a></li>
        <li class="hvuncen"><a href="https://irv77.github.io/pages/themes.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke="#f2cf09" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path><path d="M21 3a16 16 0 0 0 -12.8 10.2"></path><path d="M21 3a16 16 0 0 1 -10.2 12.8"></path><path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path></svg><span> Themes</span>
      </a></li>
        <li class="hvuncen"><a href="https://irv77.github.io/pages/extras.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke="#f2cf09" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M20 4v8"></path><path d="M16 4.5v7"></path><path d="M12 5v16"></path><path d="M8 5.5v5"></path><path d="M4 6v4"></path><path d="M20 8h-16"></path>
        </svg><span> Extras</span></a></li>
        <li class="hvuncen"><a href="https://irv77.github.io/pages/settings.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" stroke="#f2cf09" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M6 4v4"></path><path d="M6 12v8"></path><path d="M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M12 4v10"></path><path d="M12 18v2"></path><path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M18 4v1"></path><path d="M18 9v11"></path>
        </svg><span> Settings</span>
      </a></li>
      </ul>
    </div>
    </div>
  `;

  document.body.insertBefore(navbar, document.body.firstChild);

  var navigationLinks = navbar.getElementsByTagName('a');

  for (var i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function (event) {
      var target = event.target.getAttribute('href');
      console.log('Navigating to:', target);
      // Add your navigation logic here
    });
  }

  document.body.style.marginTop = "8vh";
});

// Function to enable panic mode
function panOn() {
  localStorage.setItem("panic", "on");
  location.reload();
}

// Function to disable panic mode
function panOff() {
  localStorage.setItem("panic", "off");
  location.reload();
}

// Check if panic mode is enabled
if (localStorage.getItem("panic") === "on") {
  document.addEventListener('keydown', event => {
    if (event.keyCode === 192) {
      let url = localStorage.getItem('panicAddress');
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
      }
      window.open(url, '_self');
    }
  });
}

// Create a new <p> element
var copyrightParagraph = document.createElement("p");

// Set the text content of the <p> element
copyrightParagraph.textContent = "© Vulen Corp 2024. By using this site/service, you agree to the use of cookies";

// Get a reference to the <div> element where you want to insert the <p> element
var copyrightContainer = document.querySelector(".copy"); // Replace with the actual class or ID of your <div>
copyrightContainer.style.color = "var(--text-secondary);";
copyrightContainer.style.width = "100%";
copyrightContainer.style.textAlign = "center";
// Append the <p> element to the <div>
copyrightContainer.appendChild(copyrightParagraph);

// FAQ Dropdowns
const questions = document.querySelectorAll('.question')

questions.forEach(function (question) {
  question.addEventListener('click', function () {
    question.classList.toggle('open')
  })
})

// Mobile Options
function toggleMobileMenu(icon) {
  let menu = document.querySelector(".mobile-menu")
  icon.classList.toggle('open');
  menu.classList.toggle('open');
  document.querySelector("body").classList.toggle('scrolling');
}