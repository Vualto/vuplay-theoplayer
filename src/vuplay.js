(function () {
    // Set your HLS url here.
    var hlsUrl = "<your-HLS-stream-url>";

    // Set your MPEG-dash url here.
    var dashUrl = "<your-dash-stream-url>";

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

    // Set the sources with the two stream urls and the appropriate drm settings
    player.source = {
        sources: [
            {
                src: dashUrl,
                type: 'application/dash+xml',
                drm: {
                    integration: 'vudrm',
                    token: vudrmToken,
                    widevine: {
                        licenseAcquisitionURL: 'https://widevine-proxy.drm.technology/proxy'
                    },
                    playready: {
                        licenseAcquisitionURL: 'https://playready-license.drm.technology/rightsmanager.asmx'
                    }
                }
            },
            {
                src: hlsUrl,
                type: 'application/x-mpegurl',
                drm: {
                    integration: 'vudrm',
                    token: vudrmToken,
                    fairplay: {
                        certificateURL: 'https://fairplay-license.drm.technology/certificate',
                        licenseAcquisitionURL: 'https://fairplay-license.drm.technology/license'
                    }
                }
            }
        ]
    };
})();
