(function () {
    // Set your HLS or mpeg-DASH stream url here.
    var streamUrl = "https://live-w.lwc.vrtcdn.be/groupc/live/d05012c2-6a5d-49ff-a711-79b32684615b/live.isml/manifest.m3u8";

    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "<your-vudrm-token>";

    // A HTMLDiv that HTML elements (including the video element) will be added to
    var containerElement = document.getElementById("vuplay-container");

    // Setup THEOplayer and set autoplay to true
    window.player = new THEOplayer.Player(containerElement, {
        libraryLocation: '{theoplayerjs-scripts-path}',
        ui: {
            fluid: true
        }
    });
    player.autoplay = true;

    // Add some event listeners
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

    document.getElementById("rw-btn").addEventListener("click", rewind);
    document.getElementById("ff-btn").addEventListener("click", fastforward);

    function rewind() {
        console.log(player.currentProgramDateTime);
        var temp = new Date(player.currentProgramDateTime);
        temp.setSeconds(temp.getSeconds() - 10);
        player.currentProgramDateTime = temp;
        console.log(player.currentProgramDateTime);
    }

    function fastforward() {
        console.log(player.currentProgramDateTime);
        var temp = new Date(player.currentProgramDateTime);
        temp.setSeconds(temp.getSeconds() + 10);
        player.currentProgramDateTime = temp;
        console.log(player.currentProgramDateTime);
    }

    // Set the sources with the two stream urls and the appropriate drm settings
    // currently you can only set one sources
    // if the stream is not encrypted *do not* set the drm property.

    // HLS with Fairplay Example

    // player.source = {
    //     sources: [
    //         {
    //             src: streamUrl,
    //             type: 'application/x-mpegurl',
    //             drm: {
    //                 integration: 'vudrm',
    //                 token: vudrmToken,
    //                 fairplay: {
    //                     certificateURL: 'https://fairplay-license.drm.technology/certificate',
    //                     licenseAcquisitionURL: 'https://fairplay-license.drm.technology/license'
    //                 }
    //             }
    //         }
    //     ]
    // };

    // MPEG-dash with Widevine and PlayReady Example

    // player.source = {
    //     sources: [
    //         {
    //             src: streamUrl,
    //             type: 'application/dash+xml',
    //             drm: {
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
    player.source = {
        sources: [
            {
                src: streamUrl,
                type: 'application/x-mpegurl'
            }
        ]
    };

})();
