(function () {
    // Set your mpeg-DASH or HLS url here.
    var url = "<your-stream-url>";

    // The stream type is required when setting the source on the player
    var urlType = "application/dash+xml" // or "application/x-mpegURL" if stream is HLS

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
        libraryLocation : '{theoplayerjs-scripts-path}',
    });
    player.autoplay = true;

    // For PlayReady the vudrm token is attached as a querystring parameter on the license server url.
    var playReadyLaUrl = "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(vudrmToken);

    // For widevine TBC
    var widevineLaUrl = "https://widevine-proxy.drm.technology/proxy";

    // Set the source url and add the drm settings
    player.setSource({
        sources: {
            src: url,
            type: urlType,
            drm: {
                playready: {
                    licenseAcquisitionURL: playReadyLaUrl
                 },
                widevine: {
                    licenseAcquisitionURL: widevineLaUrl
                 }
            }
        }
    })
})();