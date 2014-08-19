(function (exports) {
    'use strict';
    var webApp = exports.webApp || {};
    var Application = function (options) {
        this.ui = options.ui;
        this.prefs = options.prefs;
    };

    Application.prototype.init = function () {
        this.ui.setGreeting(this.prefs.greeting);
    };

    webApp.Application = Application;
    exports.webApp = webApp;
}(this));
