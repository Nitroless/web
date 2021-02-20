var sidebarStuff = {
    sidebarContainer: document.getElementById("sidebarContainer"),
    removeActiveClass: function() {
        let sidebarButtons = document.getElementsByClassName("sidebarButtons");
        for(let i = 0; i < sidebarButtons.length; i++) {
            sidebarButtons[i].classList.remove("active");
        }
    },
    init: function() {
        this.sidebarContainer.addEventListener("click", (e) => {
            if(e.target.classList.contains("sidebarButtons")) {
                document.getElementById("sidebarContainer").classList.toggle("open");
                loadPage.sidebarOpener.classList.toggle("open");
                let searchbar = document.getElementById("searchBox");
                if(searchbar.classList.contains("hide")) searchbar.classList.remove("hide");
                loadPage.content.innerHTML = "";
                sidebarStuff.removeActiveClass();
                switch(e.target.id) {
                    case "homeButton":
                        e.target.classList.add("active");
                        loadPage.loadEmotes()
                        break;
                    case "aboutButton":
                        e.target.classList.add("active");
                        searchbar.classList.add("hide");
                        loadPage.loadAbout()
                        break;
                    case "twitterButton":
                        location.href = "https://twitter.com/Nitroless_";
                        break;
                    case "discordButton":
                        location.href = "https://discord.gg/2h88T99sPa";
                        break;
                }
            }
        });
    }
}