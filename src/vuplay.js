(function() {
    // Set your HLS or mpeg-DASH stream url here.
    var streamUrl = "<your-stream-url>";

    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "<your-vudrm-token>";

    // A HTMLDiv that HTML elements (including the video element) will be added to
    var containerElement = document.getElementById("vuplay-container");

    // Setup THEOplayer and set autoplay to true
    var player = new THEOplayer.Player(containerElement, {
        libraryLocation: "{theoplayerjs-scripts-path}",
        ui: {
            fluid: true,
        },
    });
    player.autoplay = false;

    // Add some event listeners
    player.addEventListener("error", function(event) {
        console.error("player error", event);
    });

    player.addEventListener("encrypted", function(event) {
        console.info("content is encrypted", event);
    });

    player.addEventListener("contentprotectionerror", function(event) {
        console.error("content protection error thrown", event);
    });

    player.addEventListener("contentprotectionsuccess", function(event) {
        console.info("content protection success", event);
    });

    player.addEventListener("seeking", function(event) {
        console.warn("seeking ", event);
    });
    player.addEventListener("seeked", function(event) {
        console.warn("seeked ", event);
    });
    player.addEventListener("canplay", function(event) {
        console.warn("canplay ", event);
    });
    player.addEventListener("readystatechange", function(event) {
        console.warn("readystatechange ", event);
    });

    // Set the sources with the two stream urls and the appropriate drm settings
    // currently you can only set one sources
    // if the stream is not encrypted *do not* set the drm property.

    // HLS with Fairplay Example

    player.source = {
        sources: [
            {
                src: streamUrl,
                type: "application/x-mpegurl",
                contentProtection: {
                    integration: "vudrm",
                    token: vudrmToken,
                },
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
