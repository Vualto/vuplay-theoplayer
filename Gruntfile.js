module.exports = function (grunt) {
    var theoplayerUrl = "https://cdn-vuplay.drm.technology/standalone/theoplayer/0.2.8/theoplayer.chromeless.js"

    var vuplayUrls = {
        min: "vuplay.min.js",
        debug: "vuplay.js"
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
                flatten: true
            }
        },
        concat: {
            options: {},
            dist: {
                src: [ "src/vuplay.js" ],
                dest: "dist/vuplay.js",
            },
        },
        uglify: {
            js: {
                files: {
                    "dist/vuplay.min.js": ['dist/vuplay.js']
                }
            }
        },
        "string-replace": {
            dist: {
                files: [
                    {
                        src: "dist/index.html",
                        dest: "dist/index.html"
                    }
                ],
                options: {
                    replacements: [
                        {
                            pattern: "{theoplayerjs}",
                            replacement: theoplayerUrl
                        },
                        {
                            pattern: "{vuplayjs}",
                            replacement: grunt.option("debug") ? vuplayUrls.debug : vuplayUrls.min
                        }
                    ]
                }
            }
        },

        connect: {
            server: {
                options: {
                    protocol: "http",
                    hostname: "theoplayer.vuplay.local.drm.technology",
                    port: 14703,
                    base: "dist",
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-string-replace");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask("build", ["clean", "copy", "concat", "uglify", "string-replace"]);
    grunt.registerTask("serve", ["build", "connect"]);
};