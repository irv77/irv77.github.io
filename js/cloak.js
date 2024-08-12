fetch("/cloak.json").then((response)=>response.json()).then((data)=>{
  const container = document.getElementById("buttons-container");
  data.forEach((link)=>{
      const img = document.createElement("img");
      img.className = "presets";
      const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${link.favicon}`;
      img.src = link.favicon;
      img.onerror = ()=>{
          img.src = faviconUrl;
      }
      ;
      img.addEventListener("click", function() {
          setTitle(link.title);
          setFavicon(link.favicon);
      });
      container.appendChild(img);
  }
  );
  const img = document.createElement("img");
      img.className = "presets";
      const faviconUrl = `https://i.pinimg.com/originals/9f/da/9c/9fda9cea1b37762c0a8c9a29b605fc68.png`;
      img.src = faviconUrl;
      ;
      img.addEventListener("click", function() {
          resetTab()
      });
      container.appendChild(img);
}
);
