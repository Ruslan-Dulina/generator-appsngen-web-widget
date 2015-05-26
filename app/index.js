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
                message: 'Enter widget name:',
                default: this.appname
            },
            {
                name: 'widgetDescription',
                message: 'Enter widget description:',
                default: this.appname + ' description'
            },
            {
                name: 'enablePreferencesSupport',
                message: 'Include preferences usage example',
                type: 'confirm',
                default: true
            },
            {
                name: 'enableEventsSupport',
                message: 'Include events usage example:',
                type: 'confirm',
                default: true
            },
            {
                name: 'enableDataSourceSupport',
                message: 'Include data sources usage example:',
                type: 'confirm',
                default: true
            },
            {
                when: function (props) {
                    return props.enableDataSourceSupport;
                },
                name: 'enableQuotesSupport',
                message: 'Include quotes data source usage example:',
                type: 'confirm',
                default: true
            },
            {
                when: function (props) {
                    return props.enableDataSourceSupport;
                },
                name: 'enableTimeSeriesSupport',
                message: 'Include time series data source usage example:',
                type: 'confirm',
                default: true
            },
            {
                when: function (props) {
                    return props.enableDataSourceSupport;
                },
                name: 'enableNewsSupport',
                message: 'Include news data source usage example:',
                type: 'confirm',
                default: true
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
                description: this.props.widgetDescription,
                includeCodeMirror: Boolean(this.props.enableEventsSupport) ||
                    Boolean(this.props.enableDataSourceSupport)
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
            var metadataXmlTemplateData = {
                id: this.props.widgetId,
                name: this.props.widgetName,
                description: this.props.widgetDescription,
                includeDataSource: Boolean(this.props.enableDataSourceSupport),
                includePreferences: Boolean(this.props.enablePreferencesSupport),
                includeEvents: Boolean(this.props.enableEventsSupport)
            };
            var htmlAndJsTemplateData = {
                includeDataSourceBuilder: Boolean(this.props.enableDataSourceSupport),
                includeQuotesDataSource: Boolean(this.props.enableQuotesSupport),
                includeTimeSeriesDataSource: Boolean(this.props.enableTimeSeriesSupport),
                includeNewsDataSource: Boolean(this.props.enableNewsSupport),
                includeEventBuilder: Boolean(this.props.enableEventsSupport),
                includeGreeting: Boolean(this.props.enablePreferencesSupport)
            };
            var srcFiles = [
                'src/js/debug.js',
                'src/styles'
            ];

            if (htmlAndJsTemplateData.includeDataSourceBuilder) {
                srcFiles = srcFiles.concat([
                    'src/js/request-builder.js',
                    'src/js/request-builder.ui.js'
                ]);
            }

            if (htmlAndJsTemplateData.includeGreeting) {
                srcFiles = srcFiles.concat([
                    'src/js/greeting.js',
                    'src/js/greeting.ui.js'
                ]);
            }

            if (htmlAndJsTemplateData.includeEventBuilder) {
                srcFiles = srcFiles.concat([
                    'src/js/event-builder.js',
                    'src/js/event-builder.ui.js'
                ]);
            }

            copyFiles(this, srcFiles);

            copyTemplates(this, [
                'src/_application.xml'
            ], metadataXmlTemplateData);

            copyTemplates(this, [
                'src/_index.html',
                'src/js/_widget.js'
            ], htmlAndJsTemplateData);

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