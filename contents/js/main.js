var loadPage = {
    api_uri: 'https://api.quiprr.dev/',
    url_prefix: "https://nitroless.quiprr.dev/",
    emotes: [],
    content: "",
    searchBar: "",
    sidebarOpener: "",
    page_flag: "",
    total_pages: "",
    search_flag: false,
    prevScrollpos: window.pageYOffset,
    loadEmotes: async function(){
        try {
            const res = await fetch(`${loadPage.api_uri}v1/nitroless/emotes`);
            this.emotes = await res.json();
            this.emotes.sort(this.dynamicSorting("name"));
            this.paginator(this.emotes, 1);
        } catch(err) {
            console.error(err);
        }
    },
    paginator: function(items, page, per_page) {
        var page = page || 1,
            per_page = per_page || 100,
            offset = (page - 1) * per_page,
            paginatedItems = items.slice(offset).slice(0, per_page),
            total_pages = Math.ceil(items.length / per_page);
        this.page_flag = page+1;
        this.total_pages = total_pages;
        this.displayEmotes(paginatedItems);
    },
    loadAbout: function() {
        aboutStuff.init({content: this.content});
    },
    displayEmotes: function(emotes){
        const htmlString = emotes.map((emotes) => {
                return `<div id="${emotes.name}" class="emoteContainer" data-clipboard-text="${loadPage.url_prefix}${emotes.name}${emotes.type}">
                            <img src="${loadPage.url_prefix}${emotes.name}${emotes.type}" id="${emotes.name}Img" class="emoteImage" name="${emotes.name}" />
                            <div class="emoteCopied" style="display:none;">COPIED!</div>
                            <div id="${emotes.name}Title" class="emoteTitle">${emotes.name}</div>
                        </div>`;
        }).join('');
        if(this.search_flag) {
            this.content.innerHTML = htmlString;
        } else {
            this.content.innerHTML += htmlString;
        }   
    },
    dynamicSorting: function(property) {
        let sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function(a,b) {
            if(sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }
        }
    },
    search: function(e) {
        const searchString = e.target.value.toLowerCase();
        const filteredEmotes = this.emotes.filter((emote) => {
            return (emote.name.toLowerCase().includes(searchString));
        });
        loadPage.displayEmotes(filteredEmotes);
    },
    searchEvent: function(e) {
        loadPage.search_flag = true;
        if(e.target.value) {
            loadPage.search(e);
        } else {
            loadPage.paginator(this.emotes, 1);
            loadPage.search_flag = false;
        }
    },
    copySuccess: function(e) {
        let el = document.getElementById(e.trigger.id);
        el.getElementsByClassName('emoteImage')[0].style.display = 'none';
        el.getElementsByClassName('emoteCopied')[0].style.display = '';
        setTimeout(() => {
            el.getElementsByClassName('emoteImage')[0].style.display = '';
            el.getElementsByClassName('emoteCopied')[0].style.display = 'none';
        }, 2500);
    },
    copyFailure: function(e) {
        alert('Couldn\'t copy ' + e.trigger.id);
    },
    scrollEvent: function() {
        const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
        if(clientHeight + scrollTop >= scrollHeight - 5) {
            if(loadPage.page_flag <= loadPage.total_pages && document.getElementById("homeButton").classList.contains("active")) {
                loadPage.paginator(loadPage.emotes, loadPage.page_flag);
            }
        }
    },
    openSidebar: function(e) {
        e.target.classList.toggle("open");
        document.getElementById("sidebarContainer").classList.toggle("open");
    },
    init: function(params) {
        this.content = params.content;
        this.searchBar = params.searchBar;
        this.sidebarOpener = params.sidebarOpener;
        this.loadEmotes();
        this.sidebarOpener.addEventListener("click", (e) => this.openSidebar(e));
        this.searchBar.addEventListener("keyup", (e) => this.searchEvent(e));
        window.addEventListener("scroll", () => this.scrollEvent());
        let clipboard = new ClipboardJS('.emoteContainer');
        clipboard.on('success', this.copySuccess);
        clipboard.on('error', this.copyFailure);
    }
}
