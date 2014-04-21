/* global module */
/* global require */
/* jshint camelcase:false */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            tests: {
                files: [
                    'Gruntfile.js',
                    'karma.conf.js',
                    'src/**/*.js',
                    'tests/**/*.js'
                ],
                tasks: ['karma:dev'],
            },
        },

        jscs: {
            main: {
                options: {
                    config: '.jscs.json',
                    reporter: '.jscs-reporter.js'
                },
                files: {
                    src: ['src/**/*.js']
                }
            }
        },

        jshint: {
            main: {
                src: [
                    'Gruntfile.js',
                    'karma.conf.js',
                    'src/**/*.js',
                    'tests/**/*.js'
                ],
                options: {
                    jshintrc: true,
                    reporter: require('jshint-stylish')
                }
            }
        },

        coveralls: {
            options: {
                debug: true,
                coverage_dir: 'coverage',
                force: true
            }
        },

        karma: {
            dev: {
                configFile: 'karma.conf.js',
            },
            travis: {
                configFile: 'karma.conf.js',
                reporters: ['progress', 'coverage'],

                preprocessors: {
                    'src/*.js': 'coverage'
                },

                coverageReporter: {
                    type : 'lcov',
                    dir : 'coverage/'
                },

                plugins: [
                    'karma-coverage',
                    'karma-jasmine',
                    'karma-phantomjs-launcher'
                ],
            },
        }

    });

    // Loaded Tasks:
    grunt.loadNpmTasks('grunt-jscs-checker');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-karma');


    // Custom Tasks:

    // default task:
    // This task will conduct a pre-test before attending the files and
    // because this initial test can fail you must use the force option
    grunt.registerTask('default', '', function () {
        var tasks = ['karma:dev', 'watch:tests'];

        grunt.option('force', true);
        grunt.task.run(tasks);
    });

    // default task:
    // Executed by travis-ci
    grunt.registerTask('travis', ['jscs:main', 'jshint:main','karma:travis', 'coveralls']);

};
