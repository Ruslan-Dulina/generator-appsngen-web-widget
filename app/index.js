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
        console.log(chalk.magenta('You\'re using the AppsNgen Web Widget generator.'));

        var prompts = [
            {
                name: 'widgetName',
                message: 'What do you want to call your widget?',
                default: 'AppsNgen Web Widget'
            }
        ];

        this.prompt(prompts, function (props) {
            this.widgetName = props.widgetName;

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir('documentation');

        this.mkdir('src');

        this.mkdir('src/css');
        this.copy('src/css/ie8.css', 'src/css/ie8.css');
        this.copy('src/css/widget.less', 'src/css/widget.less');
        this.copy('src/css/widget.large.less', 'src/css/widget.large.less');
        this.copy('src/css/widget.medium.less', 'src/css/widget.medium.less');
        this.copy('src/css/widget.small.less', 'src/css/widget.small.less');

        this.mkdir('src/images');
        this.mkdir('src/fonts');

        this.mkdir('src/js');
        this.mkdir('src/js/dependencies');
        this.copy('src/js/widget.js', 'src/js/widget.js');
        this.copy('src/js/widget.ui.js', 'src/js/widget.ui.js');
        this.copy('src/js/debug.js', 'src/js/debug.js');
        this.copy('src/js/launcher.js', 'src/js/launcher.js');

        this.copy('src/widget.html', 'src/widget.html');
        this.template('src/_application.xml', 'src/application.xml');

        this.mkdir('tests');
        this.mkdir('tests/mocks');
        this.copy('tests/mocks/widget.ui.mock.js', 'tests/mocks/widget.ui.mock.js');

        this.mkdir('tests/specs');
        this.copy('tests/specs/widget.spec.js', 'tests/specs/widget.spec.js');

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