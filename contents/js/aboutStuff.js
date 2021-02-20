var aboutStuff = {
    contentDiv: "",
    creditsMaker: function(params) {
        let devDiv = new domMaker.init({
                type: "div",
                id: params.devID,
                className: "devContainer",
            }),
            devImg = new domMaker.init({
                type: "img",
                id: params.devID + "DisplayPicture",
                className: "devDisplayPicture",
                src: params.displayPicture,
            }),
            devInfo = new domMaker.init({
                type: "div",
                id: params.devID + "DevInfo",
                className: "devInfo"
            }),
            devName = new domMaker.init({
                type: "div",
                id: params.devID + "DevName",
                className: "devName",
                innerHTML: params.devName
            }),
            devRole = new domMaker.init({
                type: "div",
                id: params.devID + "DevDesc",
                className: "devDescription",
                innerHTML: params.devRole
            });
        
        domMaker.domAppender({
            div: devInfo,
            children: [devName, devRole]
        });
        domMaker.domAppender({
            div: devDiv,
            children: [devImg, devInfo]
        });

        devDiv.addEventListener("click", () => location.href = params.socialURL);

        return devDiv;
    },
    init: function(params) {
        this.contentDiv = params.content;
        let nitrolessDescription = new domMaker.init({
                type: "div",
                className: "descriptionNitroless",
                innerHTML: "<div id='headingAbout'>About</div><br>A Project where you can use any custom emoji on Discord servers without Nitro!<br><br>Just tap the emoji and paste it in the discord chat."
            }),
            team = new domMaker.init({
                type: "div",
                className: "nitrolessTeam",
            }),
            alpha = this.creditsMaker({
                devID: "alpha",
                displayPicture: "contents/socialPictures/alpha.jpg",
                devName: "Alpha",
                devRole: "Idea | Assets | Website",
                socialURL: "https://twitter.com/Kutarin_"
            }),
            paraskcd = this.creditsMaker({
                devID: "paraskcd",
                displayPicture: "contents/socialPictures/kcd.jpg",
                devName: "Paras KCD",
                devRole: "Website",
                socialURL: "https://twitter.com/ParasKCD"
            }),
            amy = this.creditsMaker({
                devID: "amy",
                displayPicture: "contents/socialPictures/amy.jpg",
                devName: "Amy",
                devRole: "iOS App | iOS Keyboard | MacOS App",
                socialURL: "https://github.com/CharlieWhile13"
            }),
            alt = this.creditsMaker({
                devID: "alt",
                displayPicture: "contents/socialPictures/alt.jpg",
                devName: "Althiometer",
                devRole: "MacOS App",
                socialURL: "https://twitter.com/a1thio"
            }),
            superbro = this.creditsMaker({
                devID: "superbro",
                displayPicture: "contents/socialPictures/superbro.png",
                devName: "Superbro",
                devRole: "iOS App | iOS Keyboard",
                socialURL: "https://twitter.com/suuperbro"
            }),
            bypass = this.creditsMaker({
                devID: "bypass",
                displayPicture: "contents/socialPictures/bypass.jpg",
                devName: "Bypass",
                devRole: "Website | Web App",
                socialURL: "https://twitter.com/imbypass"
            }),
            quippr = this.creditsMaker({
                devID: "quippr",
                displayPicture: "contents/socialPictures/quippr.png",
                devName: "Quippr",
                devRole: "VPS | Api | Bot",
                socialURL: "https://twitter.com/quiprr"
            });
        domMaker.domAppender({
            div: team,
            children: [alpha, paraskcd, amy, alt, superbro, bypass, quippr]
        });
        domMaker.domAppender({
            div: this.contentDiv,
            children: [nitrolessDescription, team]
        });
    }
}