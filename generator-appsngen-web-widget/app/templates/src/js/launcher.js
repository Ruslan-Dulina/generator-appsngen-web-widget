(function (exports) {
    'use strict';
    var appstore = exports.appstore;
    var webApp = exports.webApp || {};
    var console = exports.console || { log: function () { return; } };

    appstore.ready(function (eventContext) {
        var prefs = appstore.prefs.get('greeting');
        var ui = new webApp.ApplicationUI({
            containerId: 'app'
        });
        var app = new webApp.Application({
            ui: ui,
            prefs: prefs
        });

        if (webApp.debug) {
            console.log('application launch');
        }

        app.init();
    });

    exports.webApp = webApp;
}(this));