(function() {
    var containerElement = document.getElementById("vuplay-container");
    // Set your HLS or mpeg-DASH stream URL here.
    var streamUrl = "<your-stream-url>";
    // Please login to https://admin.drm.technology to generate a VuDRM token.
    var vudrmToken = "<your-vudrm-token>";

    // Setup THEOplayer and set autoplay to true
    var player = new THEOplayer.Player(containerElement, {
        libraryLocation: "<path-to-theoplayer-assets>",
        ui: {
            fluid: true,
        },
    });
    player.autoplay = false;
    player.poster = "vuplay_poster.png";

    // Set the sources with the two stream URL's and the appropriate drm settings
    // currently you can only set one sources
    // if the stream is not encrypted *do not* set the drm property.

    // HLS with Fairplay Example
    player.source = {
        sources: [
            {
                src: streamUrl,
                type: "application/x-mpegurl",
                // contentProtection: {
                //     integration: "vudrm",
                //     token: vudrmToken,
                // },
            },
        ],
    };

    // MPEG-dash with Widevine and PlayReady Example
    // player.source = {
    //     sources: [
    //         {
    //             src: streamUrl,
    //             type: 'application/dash+xml',
    //             contentProtection: {
    //                 integration: 'vudrm',
    //                 token: vudrmToken,
    //                 widevine: {
    //                     licenseAcquisitionURL: 'https://widevine-proxy.drm.technology/proxy'
    //                 },
    //                 playready: {
    //                     licenseAcquisitionURL: 'https://playready-license.drm.technology/rightsmanager.asmx'
    //                 }
    //             }
    //         }
    //     ]
    // };

    // HLS with AES Example
    // streamUrl = streamUrl + "?token=" + encodeURIComponent(vudrmToken);
    // player.source = {
    //     sources: [
    //         {
    //             src: streamUrl,
    //             type: 'application/x-mpegurl'
    //         }
    //     ]
    // };
})();
