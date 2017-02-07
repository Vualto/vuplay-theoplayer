(function () {
    // Set your mpeg-DASH or HLS url here.
    //var url = "<your-stream-url>";
    var url = "http://amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=mpd-time-csf)";
    //var url = "http://cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8";

    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "<your-vudrm-token>";

    var videoElement = document.getElementById("vuplay-container");

    // Dynamically keep the player at 16:9
    var onResize = function () {
        videoElement.style.height = (videoElement.clientWidth / 16) * 9;
    };
    onResize();
    window.onresize = onResize;    

    // Setup THEOplayer, setting autoplay and the player src
    var player = new THEOplayer.Player(videoElement);
    player.autoplay = true;
    player.src = url;
})();