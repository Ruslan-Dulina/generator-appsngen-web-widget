(function (exports) {
    'use strict';
    var appstore = exports.appstore;
    var webWidget = exports.webWidget || {};
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

        if (widget.debug) {
            console.log('widget launch');
        }

        widget.init();
    });

    exports.webWidget = webWidget;
}(this));