(function () {
    // Set your mpeg-DASH or HLS url here.
    var url = "<your-stream-url>";

    // The stream type is required when setting the source on the player
    var urlType = "application/dash+xml" // or "application/x-mpegURL" if stream is HLS

    url = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/vamps/vamps.ism/manifest.mpd";
    urlType = "application/dash+xml"

    //url= "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/vamps/vamps.ism/manifest.m3u8";
    //urlType = "application/x-mpegURL"

    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "<your-vudrm-token>";

    vudrmToken = "vualto-demo|2017-02-07T19:16:56Z|RAQrLiTYv+Z8U9LrxO0JDw==|50604f2509bf1adfb7d121b394f39bae5a461a39";

    var videoElement = document.getElementById("vuplay-container");

    // Dynamically keep the player at 16:9
    var onResize = function () {
        videoElement.style.height = (videoElement.clientWidth / 16) * 9;
    };
    onResize();
    window.onresize = onResize;    

    // Setup THEOplayer and set autoplay to true
    var player = new THEOplayer.Player(videoElement, {
        libraryLocation : '{theoplayerjs-scripts-path}',
    });
    player.autoplay = true;

    // For PlayReady the vudrm token is attached as a querystring parameter on the license server url.
    var playReadyLaUrl = "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(vudrmToken);

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
                    licenseAcquisitionURL: ""
                 }
            }
        }
    })
})();