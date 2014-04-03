module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        meta: {
            src: "src",
            tests: "tests",
            out: ".out",
            appName: grunt.file.readJSON('package.json').name
        },
        bower: {
            install: {
                options: {
                    targetDir: '<%= meta.src %>/js/dependencies',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: true,
                    bowerOptions: {}
                }
            }
        },
        /* cleans output folder  */
        clean: {
            beforebuild: ['<%= meta.out %>/<%= meta.appName %>', '<%= meta.out %>/<%= meta.appName %>.zip'],
            afterbuild: ['<%= meta.out %>/<%= meta.appName %>'],
            beforetest: ['<%= meta.out %>/tests', '<%= meta.out %>/coverage'],
            aftertest: ['.grunt'],
            beforejslint: ['<%= meta.out %>/jslint'],
            afterjslint: []
        },
        /* copies files which are used by application 'as is' */
        copy: {
            src: {
                expand: true,
                src: [
                    'application.xml',
                    'css/*.less',
                    'images/**/*.png',
                    'images/**/*.gif',
                    'images/**/*.jpg'
                ],
                dest: '<%= meta.out %>/<%= meta.appName %>',
                cwd: '<%= meta.src %>'
            }
        },
        /* concatenates css and js files */
        concat: {
            js: {
                src: [
                    '<%= meta.src %>/js/dependencies/respond/respond.src.js',
                    '<%= meta.src %>/js/dependencies/jquery/jquery.js',
                    '<%= meta.src %>/js/application.ui.js',
                    '<%= meta.src %>/js/application.js',
                    '<%= meta.src %>/js/launcher.js'
                ],
                dest: '<%= meta.out %>/<%= meta.appName %>/js/application.concat.js'
            },
            css: {
                src: ['<%= meta.src %>/css/*.css'],
                dest: '<%= meta.out %>/<%= meta.appName %>/css/styles.concat.css'
            },
            debug: {
                src: [
                    '<%= meta.out %>/<%= meta.appName %>/js/debug.js',
                    '<%= meta.out %>/<%= meta.appName %>/js/application.concat.js'
                ],
                dest: '<%= meta.out %>/<%= meta.appName %>/js/application.concat.js'
            }
        },
        /* minifies concateneted js files */
        uglify: {
            js: {
                src: '<%= meta.out %>/<%= meta.appName %>/js/application.concat.js',
                dest: '<%= meta.out %>/<%= meta.appName %>/js/application.concat.js'
            }
        },
        /* minifies concateneted css files */
        cssmin: {
            css: {
                src: ['<%= meta.out %>/<%= meta.appName %>/css/styles.concat.css'],
                dest: '<%= meta.out %>/<%= meta.appName %>/css/styles.concat.css'
            }
        },
        htmlrefs: {
            build: {
                src: '<%= meta.src %>/application.html',
                dest: '<%= meta.out %>/<%= meta.appName %>'
            }
        },
        jasmine: {
            "application": {
                "src": [
                    "<%= meta.src %>/js/application.js"
                ],
                "options": {
                    "vendor": [
                        "<%= meta.src %>/js/dependencies/jquery-1.7.2.min.js",
                        "<%= meta.tests %>/mocks/application.ui.mock.js"
                    ],
                    "specs": [
                        "<%= meta.tests %>/specs/application.spec.js"
                    ],
                    "junit": {
                        "path": "<%= meta.out %>/tests",
                        "consolidate": false
                    },
                    "keepRunner": false,
                    "template": require("grunt-template-jasmine-istanbul"),
                    "templateOptions": {
                        "coverage": "<%= meta.out %>/coverage/coverage.json",
                        "report": [
                            {
                                "type": "lcov",
                                "options": {
                                    "dir": "<%= meta.out %>/coverage"
                                }
                            },
                            {
                                type: 'text-summary'
                            }
                        ]
                    }
                }
            }
        },
        jslint: {
            "all": {
                "src": [
                    "<%= meta.src %>/js/application.js",
                    "<%= meta.src %>/js/application.ui.js",
                    "<%= meta.src %>/js/launcher.js",
                    "<%= meta.src %>/js/debug.js"
                ],
                "exclude": [],
                "directives": {
                    "browser": true,
                    "unparam": true,
                    "todo": true,
                    "predef": [
                        "jQuery",
                        "$",
                        "appstore"
                    ],
                    "vars": true,
                    "plusplus": true,
                    "nomen": true,
                    "white": true
                },
                "options": {
                    "junit": "<%= meta.out %>/jslint/junit.xml",
                    "log": "<%= meta.out %>/jslint/lint.log",
                    "jslintXml": "<%= meta.out %>/jslint/jslint_xml.xml",
                    "errorsOnly": true,
                    "failOnError": false
                }
            }
        },
        compress: {
            zip: {
                options: { archive: '<%= meta.out %>/<%= meta.appName %>.zip' },
                files: [
                    { expand: true, src: ['**/*'], cwd: '<%= meta.out %>/<%= meta.appName %>' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-htmlrefs');
    grunt.loadNpmTasks('grunt-bower-task');

    // Default task (prod). Produces minified version
    grunt.registerTask('default', [
        'clean:beforebuild',
        'copy:src',
        'concat:css', 'concat:js',
        'cssmin',
        'uglify',
        'htmlrefs',
        'compress',
        'clean:afterbuild'
    ]);

    // dev task. The same as  prod but without minification.
    grunt.registerTask('dev', [
        'clean:beforebuild',
        'copy:src',
        'concat:css', 'concat:js', 'concat:debug',
        'htmlrefs',
        'compress',
        'clean:afterbuild'
    ]);

    grunt.registerTask('test', [
        'clean:beforetest',
        'jasmine',
        'clean:aftertest'
    ]);

    grunt.registerTask('jslint-check', [
        'clean:beforejslint',
        'jslint',
        'clean:afterjslint'
    ]);
};
