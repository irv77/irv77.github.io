const projectdetails = document.querySelector(".projectdetails");
const navtext = document.querySelectorAll(".navtext");
function headerselect(id) {
    fetch("assets/projects.json").then((response) => response.json()).then((data) => {
        if (document.querySelector("nav").classList.contains("mobile")) {mobilemenu(false)};
        projectfullscreen(data.find(item => item.id === id));
    });
};
function error403() {
    document.querySelector(".error").style.display = "flex";
    let timeleft = 30;
    let downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.querySelector(".error").style.display = "none";
        } else {
            document.querySelector(".number").innerHTML = timeleft;
        }
        timeleft -= 1;
    }, 1000);
};

function mobilemenu(state) {
    const exitsvg = `<path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"></path>`;
    const menusvg = `<path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/>`;
    if (document.querySelector(".navmenu svg").innerHTML === exitsvg) {
        document.body.style.overflow = "visible";
        document.querySelector(".mobilemenu").style.display = "none";
        document.querySelector("nav").classList.remove("mobile");
        document.querySelector(".navmenu svg").innerHTML = menusvg;
        return;
    }
    else if (state === true) {
        document.body.style.overflow = "hidden";
        document.querySelector(".mobilemenu").style.display = "flex";
        document.querySelector("nav").classList.add("mobile");
        document.querySelector(".navmenu svg").innerHTML = exitsvg;
    }
    else if (state === false) {
        document.body.style.overflow = "visible";
        document.querySelector(".mobilemenu").style.display = "none";
        document.querySelector("nav").classList.remove("mobile");
        document.querySelector(".navmenu svg").innerHTML = menusvg;
    }
};

function projectfullscreen(id) {
    const url = new URL(window.location.href);
    let urlparam = url.searchParams.get("id");
    if (!urlparam) {
        if (id.cover) {url.searchParams.append("id", id.id); document.title = id.title + " | IRV77"}
        else if (id.name) {url.searchParams.append("id", id.name); document.title = id.name + " | IRV77"}
        window.history.pushState({}, '', url.toString());
    };

    while (projectdetails.firstChild) {projectdetails.removeChild(projectdetails.firstChild)};
    navtext.forEach(item => {item.classList.remove("selected")});
    if (id.type) {
        if (id.type === "eaglercraft") {navtext[1].classList.add("selected")}
        else if (id.type === "fnaf") {navtext[2].classList.add("selected")}
        else if (id.type === "gaming") {navtext[3].classList.add("selected")}
        else if (id.type === "other") {navtext[4].classList.add("selected")}
    }
    else (navtext[4].classList.add("selected"));
    document.body.style.overflow = "hidden";
    document.querySelector(".exit").style.display = "block";
    projectdetails.style.display = "flex";
    generateprojectdetails(id);
};

function exit() {
    const url = new URL(window.location.href);
    url.searchParams.delete('id');
    window.history.pushState({}, '', url.toString());
    document.title = "IRV77's Site"

    navtext.forEach(item => {item.classList.remove("selected")});
    navtext[0].classList.add("selected")
    document.body.style.overflow = "initial";
    document.querySelector(".exit").style.display = "none";
    projectdetails.style.display = "none";
    while (projectdetails.firstChild) {projectdetails.removeChild(projectdetails.firstChild)};
};

const mainoptions = document.querySelector(".main-options");
function generateprojects() {
    fetch("assets/projects.json").then((response) => response.json()).then((data) => {
        data.forEach((project) => {
            const projectdiv = document.createElement("div");
            projectdiv.className = "project";
            projectdiv.addEventListener("click", () => {projectfullscreen(project)});

            const image = document.createElement("img");
            image.src = project.cover;

            const textdiv = document.createElement("div");

            const title = document.createElement("h1");
            title.innerHTML = project.title;

            const description = document.createElement("h3");
            description.innerHTML = project.description;

            const version = document.createElement("h2");
            version.innerHTML = project.version;

            textdiv.appendChild(title);
            textdiv.appendChild(description);
            textdiv.appendChild(version);
            projectdiv.appendChild(image);
            projectdiv.appendChild(textdiv);
            mainoptions.appendChild(projectdiv);
        }
        )
    })
};

function timeDifference(current, previous) {
    
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - previous;
    
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hour(s) ago';   
    }

    else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' day(s) ago';   
    }
    
    else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' month(s) ago';   
    }
    
    else {
         return Math.round(elapsed/msPerYear*10)/10 + ' year(s) ago';   
    }
};

const lastupdated = document.querySelector(".lastupdated");
function generatelastupdate() {
    fetch("https://api.github.com/search/repositories?q=user:irv77&sort=updated&order=desc").then((response) => response.json()).then((data) => {
        const lastupdate = data.items[0];

        const tag = document.createElement("h5");
        tag.innerHTML = "Last Updated";

        const updatediv = document.createElement("div");
        updatediv.className = "updatediv";
        
        const coverimage = document.createElement("img");
        coverimage.src = "https://raw.githubusercontent.com/irv77/" + lastupdate.name + "/main/.github/assets/launcher.png";

        const textdiv = document.createElement("div");
        textdiv.style.margin = "1.5vw 1vw";

        const headerdiv = document.createElement("div");
        headerdiv.style.display = "flex";
        headerdiv.style.alignItems = "center";

        fetch("assets/projects.json").then((response) => response.json()).then((data) => {
            const project = data.find(item => item.id === lastupdate.name);

            lastupdated.addEventListener("click", () => {
                fetch("assets/projects.json").then((response) => response.json()).then((data) => {
                    const local = data.find(item => item.id === lastupdate.name);
                    if (local) {projectfullscreen(local)}
                    else (projectfullscreen(lastupdate));
                });
            });
            coverimage.onerror = function() {
                coverimage.src = "https://raw.githubusercontent.com/irv77/" + lastupdate.name + "/main/.github/assets/preview.png"
                coverimage.onerror = function() {
                    coverimage.src = "https://raw.githubusercontent.com/irv77/" + lastupdate.name + "/main/.github/assets/ingame.png"
                    coverimage.onerror = function() {
                        updatediv.style.alignItems = "center";
                        textdiv.style.margin = "0vw 1vw 1.5vw";
                        tag.style.margin = "0 0.5vw -2vw 0";
                        if (project) {
                            coverimage.src = project.cover;
                            coverimage.className = "logo";
                            updatediv.style.flexDirection = "row";
                        }
                        else {coverimage.remove(); updatediv.style.flexDirection = "row"};
                    };   
                };
            };

            const title = document.createElement("h1");
            if (project) {title.innerHTML = project.title}
            else {title.innerHTML = lastupdate.name};

            const version = document.createElement("h2");
            if (project) {version.innerHTML = project.version}
            else {version.innerHTML = "v???"};
            
            const projectnotesdiv = document.createElement("div")
            projectnotesdiv.className = "projectnotes";

            const stars = document.createElement("div");
            stars.style.color = "yellow";
            stars.style.fill = "yellow"
            stars.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg><h4>Stars: ` + lastupdate.watchers  + `</h4>`;

            const forks = document.createElement("div");
            forks.style.color = "darkviolet";
            forks.style.fill = "darkviolet"
            forks.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M176 168C189.3 168 200 157.3 200 144C200 130.7 189.3 120 176 120C162.7 120 152 130.7 152 144C152 157.3 162.7 168 176 168zM256 144C256 176.8 236.3 205 208 217.3L208 240C208 266.5 229.5 288 256 288L384 288C410.5 288 432 266.5 432 240L432 217.3C403.7 205 384 176.8 384 144C384 99.8 419.8 64 464 64C508.2 64 544 99.8 544 144C544 176.8 524.3 205 496 217.3L496 240C496 301.9 445.9 352 384 352L352 352L352 422.7C380.3 435 400 463.2 400 496C400 540.2 364.2 576 320 576C275.8 576 240 540.2 240 496C240 463.2 259.7 435 288 422.7L288 352L256 352C194.1 352 144 301.9 144 240L144 217.3C115.7 205 96 176.8 96 144C96 99.8 131.8 64 176 64C220.2 64 256 99.8 256 144zM464 168C477.3 168 488 157.3 488 144C488 130.7 477.3 120 464 120C450.7 120 440 130.7 440 144C440 157.3 450.7 168 464 168zM344 496C344 482.7 333.3 472 320 472C306.7 472 296 482.7 296 496C296 509.3 306.7 520 320 520C333.3 520 344 509.3 344 496z"/></svg><h4>Forks: ` + lastupdate.forks  + `</h4>`;

            const description = document.createElement("h3");
            if (project) {description.innerHTML = project.description}
            else {description.innerHTML = lastupdate.description};
            
            headerdiv.appendChild(title);
            headerdiv.appendChild(version);
            projectnotesdiv.appendChild(stars);
            projectnotesdiv.appendChild(forks);
            textdiv.appendChild(projectnotesdiv);
            textdiv.appendChild(description);
        });

        const updatetimediv = document.createElement("div")
        updatetimediv.className = "updatetime";
        updatetimediv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z"/></svg>`

        const updatetime = document.createElement("h6")
        updatetime.innerHTML = "Updated " + timeDifference(new Date().getTime(), new Date(lastupdate.pushed_at));

        textdiv.appendChild(headerdiv);
        updatediv.appendChild(coverimage);
        updatediv.appendChild(textdiv);
        updatetimediv.appendChild(updatetime);
        lastupdated.appendChild(tag);
        lastupdated.appendChild(updatediv);
        lastupdated.appendChild(updatetimediv);
    })
};

function generateprojectdetails(data) {
            let project = data

            const headerimagediv = document.createElement("div");
            headerimagediv.className = "headerimg";

            const headerimage = document.createElement("img");
            headerimage.src = "assets/projects/covers/" + project.type + ".png";
            headerimage.onerror = function() {headerimage.src = "assets/projects/covers/other.png"; console.clear()};
            if (project.headerimage) {headerimage.src = project.headerimage};

            const headerdiv = document.createElement("div");
            headerdiv.className = "header";

            const headertextdiv = document.createElement("div");
            headertextdiv.style.width = "85%";

            const logo = document.createElement("img");
            logo.className = "glow";

            const logo2 = document.createElement("img");
            if (project.cover) {logo.src = project.cover; logo2.src = project.cover}
            else {logo.remove(); logo2.remove()};

            const headertoptextdiv = document.createElement("div");
            headertoptextdiv.style.display = "flex";
            headertoptextdiv.style.alignItems = "center";
            headertoptextdiv.style.gap = "1vw";

            const title = document.createElement("h1");
            if (project.title) {title.innerHTML = project.title}
            else {title.innerHTML = project.name};

            const version = document.createElement("h2");
            if (project.version) {version.innerHTML = project.version}
            else {version.innerHTML = "v???"};

            const description = document.createElement("h3");
            if (project) {description.innerHTML = project.description}
            else {description.innerHTML = "No Description."};

            const linksdiv = document.createElement("div");
            linksdiv.className = "links";

            const linkstext = document.createElement("h1");
            linkstext.innerHTML = "Links"

            const download = document.createElement("div");
            download.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z"/></svg><h2>Download</h2>`
            download.addEventListener("click", () => {window.open(project.download, "_blank")});

            const preview = document.createElement("div");
            preview.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z"/></svg><h2>Preview</h2>`
            if (project.link) {preview.addEventListener("click", () => {window.open(project.link, "_blank")})};

            const github = document.createElement("div");
            github.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentcolor" stroke-width="2.25"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg><h2>Github</h2>`
            if (project.cover) {github.addEventListener("click", () => {window.open("https://github.com/irv77/" + project.id + "/", "_blank")})};

            const githubdiv = document.createElement("div");
            githubdiv.className = "githubdiv";

            const previewdiv = document.createElement("div");
            previewdiv.className = "preview";

            const previewtext = document.createElement("h1");
            previewtext.innerHTML = "Preview";

            fetch("https://api.github.com/search/repositories?q=user:irv77&sort=updated&order=desc")
            .then((response) => {if (response.status === 403) {throw error403()}; return response.json()})
            .then((data) => {
                let githubdata
                if (project.github) {githubdata = data.items.find(item => item.name === project.id)}
                else {githubdata = project};

                const githubinfodiv = document.createElement("div");
                githubinfodiv.className = "githubinfo";

                if (githubdata.name) {
                    const previewimage = document.createElement("img");
                    previewimage.src = "https://raw.githubusercontent.com/irv77/" + githubdata.name + "/main/.github/assets/launcher.png";

                    previewimage.onerror = function() {
                        previewimage.src = "https://raw.githubusercontent.com/irv77/" + githubdata.name + "/main/.github/assets/preview.png"
                        previewimage.onerror = function() {
                            previewimage.src = "https://raw.githubusercontent.com/irv77/" + githubdata.name + "/main/.github/assets/ingame.png"
                            previewimage.onerror = function() {previewdiv.remove(); githubinfodiv.classList.add("fullscreen")};
                        };
                    };
                    
                    previewdiv.appendChild(previewimage);
                } else {githubinfodiv.classList.add("fullscreen")};

                const githubinfotext = document.createElement("h1");
                githubinfotext.innerHTML = "Information";

                const informationdivider = document.createElement("hr");

                const createdate = document.createElement("div");
                createdate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg>`
                    
                const createdatetext = document.createElement("h2")
                if (githubdata.created_at) {createdatetext.innerHTML = "Created " + timeDifference(new Date().getTime(), new Date(githubdata.created_at))};

                const updatedate = document.createElement("div");
                updatedate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z"/></svg>`

                const updatedatetext = document.createElement("h2")
                if (githubdata.pushed_at) {updatedatetext.innerHTML = "Updated " + timeDifference(new Date().getTime(), new Date(githubdata.pushed_at))};

                const stars = document.createElement("div");
                if (githubdata.watchers || githubdata.watchers == 0) {stars.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg><h2>Stars: ` + githubdata.watchers + `</h2>`};

                const forks = document.createElement("div");
                if (githubdata.forks || githubdata.forks == 0) {forks.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M176 168C189.3 168 200 157.3 200 144C200 130.7 189.3 120 176 120C162.7 120 152 130.7 152 144C152 157.3 162.7 168 176 168zM256 144C256 176.8 236.3 205 208 217.3L208 240C208 266.5 229.5 288 256 288L384 288C410.5 288 432 266.5 432 240L432 217.3C403.7 205 384 176.8 384 144C384 99.8 419.8 64 464 64C508.2 64 544 99.8 544 144C544 176.8 524.3 205 496 217.3L496 240C496 301.9 445.9 352 384 352L352 352L352 422.7C380.3 435 400 463.2 400 496C400 540.2 364.2 576 320 576C275.8 576 240 540.2 240 496C240 463.2 259.7 435 288 422.7L288 352L256 352C194.1 352 144 301.9 144 240L144 217.3C115.7 205 96 176.8 96 144C96 99.8 131.8 64 176 64C220.2 64 256 99.8 256 144zM464 168C477.3 168 488 157.3 488 144C488 130.7 477.3 120 464 120C450.7 120 440 130.7 440 144C440 157.3 450.7 168 464 168zM344 496C344 482.7 333.3 472 320 472C306.7 472 296 482.7 296 496C296 509.3 306.7 520 320 520C333.3 520 344 509.3 344 496z"/></svg><h2>Forks: ` + githubdata.forks + `</h2>`};

                if (project.created) {createdatetext.innerHTML = "Created " + timeDifference(new Date().getTime(), new Date(project.created))};
                if (project.updated) {updatedatetext.innerHTML = "Updated " + timeDifference(new Date().getTime(), new Date(project.updated))};

                if (!project.github) {stars.remove(); forks.remove()};
                if (project.preview) {previewimage.src = project.preview};
                if (githubdata.name) {github.addEventListener("click", () => {window.open("https://github.com/irv77/" + project.name + "/", "_blank")})};
                if (githubdata.homepage) {preview.addEventListener("click", () => {window.open(githubdata.homepage, "_blank")})};

                linksdiv.appendChild(linkstext);
                if (project.download) {linksdiv.appendChild(download)};
                if (project.link) {linksdiv.appendChild(preview)}
                else if (githubdata.homepage) {linksdiv.appendChild(preview)}
                if (project.github) {linksdiv.appendChild(github)}
                else if (githubdata.name) {linksdiv.appendChild(github)}
                previewdiv.prepend(previewtext);
                githubinfodiv.appendChild(githubinfotext);
                createdate.appendChild(createdatetext);
                updatedate.appendChild(updatedatetext);
                githubinfodiv.appendChild(informationdivider);
                if (createdatetext.innerHTML) {githubinfodiv.appendChild(createdate)};
                if (updatedatetext.innerHTML) {githubinfodiv.appendChild(updatedate)};
                if (stars.innerHTML) {githubinfodiv.appendChild(stars)};
                if (forks.innerHTML) {githubinfodiv.appendChild(forks)};
                if (githubdata.name) {githubdiv.appendChild(previewdiv)};
                githubdiv.appendChild(githubinfodiv);
            });

            const copyright = document.createElement("p");
            copyright.innerHTML = `Copyright © 1999-2025 <span>Vulen Corporation</span>. All rights reserved.`;

            headerdiv.appendChild(logo);
            headerdiv.appendChild(logo2);
            headertoptextdiv.appendChild(title);
            headertoptextdiv.appendChild(version);
            headerimagediv.appendChild(headerimage);
            headertextdiv.appendChild(headertoptextdiv);
            headertextdiv.appendChild(description)
            headerdiv.appendChild(headertextdiv);
            projectdetails.appendChild(headerimagediv);
            projectdetails.appendChild(headerdiv);
            projectdetails.appendChild(linksdiv);
            projectdetails.appendChild(githubdiv);
            projectdetails.appendChild(copyright);
};

window.onload = function() {
    const url = new URL(window.location.href);
    let urlparam = url.searchParams.get("id");
    if (urlparam) {
        fetch("assets/projects.json").then((response) => response.json()).then((data) => {
            const local = data.find(item => item.id === urlparam);
            if (local) {projectfullscreen(local); document.title = local.title + " | IRV77"}
            else (
                fetch("https://api.github.com/search/repositories?q=user:irv77&sort=updated&order=desc").then((response) => response.json()).then((data) => {
                    const local = data.items.find(item => item.name === urlparam);
                    projectfullscreen(local);
                    document.title = local.name + " | IRV77";
                })
            );
        });
    };
};

generatelastupdate();
generateprojects();