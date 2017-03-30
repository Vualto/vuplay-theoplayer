(function () {
    // Set your MPEG-dash url here.
    // var dashUrl = "https://live-dash.lwc.vrtcdn.be/groupc/live/d05012c2-6a5d-49ff-a711-79b32684615b/live.isml/.mpd";
    var dashUrl = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/sintel/sintel_nodrm.ism/manifest.mpd";

    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "<your-vudrm-token>";

    // A HTMLDiv that HTML elements (including the video element) will be added to
    var containerElement = document.getElementById("vuplay-container");

    // Dynamically keep the player at 16:9
    var onResize = function () {
        containerElement.style.height = (containerElement.clientWidth / 16) * 9;
    };
    onResize();
    window.onresize = onResize;

    // Setup THEOplayer and set autoplay to true
    var player = new THEOplayer.Player(containerElement, {
        libraryLocation: '{theoplayerjs-scripts-path}',
    });
    player.autoplay = true;


    player.addEventListener("error", function (event) {
        console.error("player error", event);
    });

    player.addEventListener("encrypted", function (event) {
        console.info("content is encrypted", event);
    });

    player.addEventListener("contentprotectionerror", function (event) {
        console.error("content protection error thrown", event);
    });

    player.addEventListener("contentprotectionsuccess", function (event) {
        console.info("content protection success", event);
    });

    // Set the sources with the two stream urls and the appropriate drm settings
    player.source = {
        sources: [
            {
                src: dashUrl,
                type: 'application/dash+xml'
            }
        ]
    };

    window.player = player;
})();
