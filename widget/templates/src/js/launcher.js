(function (exports) {
    'use strict';
    var appstore = exports.appstore;
    var webWidget = exports.widget || {};
    var console = exports.console || { log: function () { return; } };

    appstore.ready(function (eventContext) {
        var prefs = appstore.prefs.get('greeting');
        var ui = new webWidget.WidgetUI({
            containerId: 'widget'
        });
        var widget = new webWidget.Widget({
            ui: ui,
            prefs: prefs
        });

        if (webWidget.debug) {
            console.log('widget launch');
        }

        widget.init();
    });

    exports.widget = webWidget;
}(this));