module.exports = function(grunt) {
    var version = "<version>";
    var client = "<client>";
    var theoplayerUrls = {
        player: `<theoplayer JS>`,
        scriptsPath: `<theoplayer assets>`,
        css: `<css stylesheet>`,
    };
    console.info("THEOplayer assets: ", theoplayerUrls.player);

    var vuplayUrls = {
        min: "vuplay.min.js",
        debug: "vuplay.js",
    };

    grunt.initConfig({
        dist: "dist",
        package: grunt.file.readJSON("package.json"),

        clean: ["<%= dist %>/*"],
        copy: {
            all: {
                expand: true,
                src: ["index.html", "poster.png"],
                dest: "<%= dist %>/",
                flatten: true,
            },
        },
        concat: {
            options: {},
            dist: {
                src: ["src/vuplay.js"],
                dest: "dist/vuplay.js",
            },
        },
        uglify: {
            js: {
                files: {
                    "dist/vuplay.min.js": ["dist/vuplay.js"],
                },
            },
        },
        "string-replace": {
            dist: {
                files: [
                    {
                        src: "dist/index.html",
                        dest: "dist/index.html",
                    },
                    {
                        src: "dist/vuplay.js",
                        dest: "dist/vuplay.js",
                    },
                    {
                        src: "dist/vuplay.min.js",
                        dest: "dist/vuplay.min.js",
                    },
                ],
                options: {
                    replacements: [
                        {
                            pattern: "{theoplayerjs}",
                            replacement: theoplayerUrls.player,
                        },
                        {
                            pattern: "{theoplayer-css}",
                            replacement: theoplayerUrls.css,
                        },
                        {
                            pattern: "{theoplayerjs-scripts-path}",
                            replacement: theoplayerUrls.scriptsPath,
                        },
                        {
                            pattern: "{vuplayjs}",
                            replacement: grunt.option("debug")
                                ? vuplayUrls.debug
                                : vuplayUrls.min,
                        },
                    ],
                },
            },
        },

        connect: {
            server: {
                options: {
                    protocol: "https",
                    hostname: "theoplayer.local.vuplay.co.uk",
                    port: 14703,
                    base: "dist",
                    keepalive: true,
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-string-replace");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask("build", [
        "clean",
        "copy",
        "concat",
        "uglify",
        "string-replace",
    ]);
    grunt.registerTask("serve", ["build", "connect"]);
};
