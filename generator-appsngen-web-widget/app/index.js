'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var AppsngenGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

        this.on('end', function () {
            this.installDependencies({
                skipInstall: this.options['skip-install'],
                callback: function () {
                    this.spawnCommand('grunt', ['bower']);
                }.bind(this)
            });
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        console.log(chalk.magenta('You\'re using the AppsNgen Web Application generator.'));

        var prompts = [
            {
                name: 'appName',
                message: 'What do you want to call your application?',
                default: 'AppsNgen Web Application'
            }
        ];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir('documentation');

        this.mkdir('src');

        this.mkdir('src/css');
        this.copy('src/css/ie8.css', 'src/css/ie8.css');
        this.copy('src/css/application.less', 'src/css/application.less');
        this.copy('src/css/application.large.less', 'src/css/application.large.less');
        this.copy('src/css/application.medium.less', 'src/css/application.medium.less');
        this.copy('src/css/application.small.less', 'src/css/application.small.less');

        this.mkdir('src/images');
        this.mkdir('src/fonts');

        this.mkdir('src/js');
        this.mkdir('src/js/dependencies');
        this.copy('src/js/application.js', 'src/js/application.js');
        this.copy('src/js/application.ui.js', 'src/js/application.ui.js');
        this.copy('src/js/debug.js', 'src/js/debug.js');
        this.copy('src/js/launcher.js', 'src/js/launcher.js');

        this.copy('src/application.html', 'src/application.html');
        this.template('src/_application.xml', 'src/application.xml');

        this.mkdir('tests');
        this.mkdir('tests/mocks');
        this.copy('tests/mocks/application.ui.mock.js', 'tests/mocks/application.ui.mock.js');

        this.mkdir('tests/specs');
        this.copy('tests/specs/application.spec.js', 'tests/specs/application.spec.js');

        this.copy('Gruntfile.js', 'Gruntfile.js');

        this.template('_bower.json', 'bower.json');
        this.template('_package.json', 'package.json');

        this.copy('build_dev.bat', 'build_dev.bat');
        this.copy('build_prod.bat', 'build_prod.bat');
        this.copy('build_jslint.bat', 'build_jslint.bat');
        this.copy('build_test.bat', 'build_test.bat');
    }
});

module.exports = AppsngenGenerator;