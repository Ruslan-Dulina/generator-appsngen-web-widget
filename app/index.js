'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var path = require('path');
var _s = require('underscore.string');

var copyFiles = function (generator, files) {
    var i;

    for (i = 0; i < files.length; i++) {
        generator.fs.copy(
            generator.templatePath(files[i]),
            generator.destinationPath(files[i])
        );
    }
};

var copyTemplates = function (generator, templates, data) {
    var i, template, templatePath, templateName, compiledName;

    for (i = 0; i < templates.length; i++) {
        template = templates[i];
        templatePath = path.dirname(template);
        templateName = path.basename(template);
        compiledName = templateName.substring(1); // remove leading _ symbol

        generator.fs.copyTpl(
            generator.templatePath(path.join(templatePath, templateName)),
            generator.destinationPath(path.join(templatePath, compiledName)),
            data
        );
    }
};

// copyFiles doesn't create empty folders so we need to create them manually
var createDirectories = function (directoryNames) {
    var i, directoryName;

    for (i = 0; i < directoryNames.length; i++) {
        directoryName = directoryNames[i];

        mkdirp.sync(directoryName);
        // make output similar to yeoman's
        console.log('   ' + chalk.green('create') + ' ' + directoryName.replace('/', '\\') + '\\');
    }
};

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'You\'re using the ' + chalk.red('AppsNgen Web Widget') + ' generator.'
        ));

        var prompts = [
            {
                name: 'widgetName',
                message: 'What do you want to call your widget?',
                default: this.appname
            },
            {
                name: 'widgetDescription',
                message: 'How would you describe your widget?',
                default: this.appname + ' description'
            }
        ];

        this.prompt(prompts, function (props) {
            this.props = props;
            this.props.widgetId = _s.slugify(this.props.widgetName);

            done();
        }.bind(this));
    },
    writing: {
        projectFiles: function () {
            var packageInfo = {
                name: this.props.widgetId, // package name same as widget id
                description: this.props.widgetDescription
            };

            copyFiles(this, [
                'Gruntfile.js',
                'LICENSE',
                'README.md'
            ]);
            copyTemplates(this, [
                '_package.json',
                '_bower.json'
            ], packageInfo);
        },
        src: function () {
            var metadata = {
                id: this.props.widgetId,
                name: this.props.widgetName,
                description: this.props.widgetDescription
            };

            copyFiles(this, [
                'src/index.html',
                'src/js/greeting.js',
                'src/js/greeting.ui.js',
                'src/js/debug.js',
                'src/js/widget.js',
                'src/styles'
            ]);

            copyTemplates(this, [
                'src/_application.xml'
            ], metadata);

            createDirectories([
                'src/images',
                'src/fonts'
            ]);
        },
        tests: function () {
            copyFiles(this, [
                'tests'
            ]);
        },
        documentation: function () {
            createDirectories([
                'documentation'
            ]);
        }
    },
    install: function () {
        this.installDependencies({
            bower: false,
            callback: function () {
                this.spawnCommand('grunt');
            }.bind(this)
        });
    }
});