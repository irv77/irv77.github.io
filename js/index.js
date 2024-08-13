// Cloak Tab Settings
const tab = localStorage.getItem("tab");
const tabData = tab ? JSON.parse(tab) : {};

if (tabData.title) {
  document.title = tabData.title;
}

if (tabData.icon) {
  const faviconLink = document.querySelector("link[rel='icon']");
  faviconLink.href = tabData.icon;
}

const settingsDefaultTab = {
  title: "Settings | Kruated Phear",
  icon: "/assets/images/logos/favicon.png",
};

const setTitle = (title = "") => {
  document.title = title || settingsDefaultTab.title;
  if (title) {
    tabData.title = title;
  } else {
    delete tabData.title;
  }
  localStorage.setItem("tab", JSON.stringify(tabData));
};

const setFavicon = (url) => {
  const faviconLink = document.querySelector("link[rel='icon']");
  
  // Try to load the URL as an image
  const img = new Image();
  img.src = url;
  img.onload = () => {
    faviconLink.href = url;
    if (url) {
      tabData.icon = url;
    } else {
      delete tabData.icon;
    }
    localStorage.setItem("tab", JSON.stringify(tabData));
  };

  img.onerror = () => {
    // If the URL is not an image, use Google's Favicon API
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${url}`;
    faviconLink.href = faviconUrl || settingsDefaultTab.icon;
    if (url) {
      tabData.icon = faviconUrl;
    } else {
      delete tabData.icon;
    }
    localStorage.setItem("tab", JSON.stringify(tabData));
  };
};

const resetTab = () => {
  setTitle();
  setFavicon();
  document.getElementById("title").value = "";
  document.getElementById("icon").value = "";
  localStorage.setItem("tab", JSON.stringify({}));
  console.clear();
};

if (tabData.title) {
  document.getElementById("title").value = tabData.title;
}

if (tabData.icon) {
  document.getElementById("icon").value = tabData.icon;
}

// Function to enable panic mode
function panOn() {
  panicOff.classList.remove("active");
  panicOn.classList.add("active");
  localStorage.setItem("panic", "on");
}

// Function to disable panic mode
function panOff() {
  panicOn.classList.remove("active");
  panicOff.classList.add("active");
  localStorage.setItem("panic", "off");
}

// Change panic text activation
  const panicOff = document.getElementById("panicoff");
  const panicOn = document.getElementById("panicon");

  if (panicOff) {
    if (localStorage.getItem("panic") === "on" || document.body.getAttribute("panic") === "on") {
      panicOff.classList.remove("active");
      panicOn.classList.add("active");
    }
    if (localStorage.getItem("panic") === "off") {
      panicOn.classList.remove("active");
      panicOff.classList.add("active");
    }
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

// Theme Settings
const themeKey = "selectedTheme";

let selectedTheme = localStorage.getItem(themeKey);

if (!selectedTheme) {
  selectedTheme = "default";
  document.body.setAttribute("data-theme", selectedTheme);
  localStorage.setItem(themeKey, selectedTheme);
} else {
  document.body.setAttribute("data-theme", selectedTheme);
}