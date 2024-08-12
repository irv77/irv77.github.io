let tabData = {};
const tab = localStorage.getItem("tab");

if (tab) {
  try {
    tabData = JSON.parse(tab);
  } catch (e) {
    console.log("Error parsing tab data from localStorage", e);
  }
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



// Event listener for panic address change
document.getElementById('panic-address').addEventListener('change', () => {
  localStorage.setItem('panicAddress', document.getElementById('panic-address').value);
});

// Set saved panic address if available
const savedPanicAddress = localStorage.getItem('panicAddress');
if (savedPanicAddress) {
  document.getElementById('panic-address').value = savedPanicAddress;
}