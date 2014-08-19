/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('appsngen generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.widget = helpers.createGenerator('appsngen-web-widget:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'src/application.xml',
      'src/index.html'
    ];

    helpers.mockPrompt(this.widget, {
      'someOption': true
    });
    this.widget.options['skip-install'] = true;
    this.widget.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
