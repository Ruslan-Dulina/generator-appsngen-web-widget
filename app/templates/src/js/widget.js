(function (exports) {
    //'use strict';

    var appsngen = exports.appsngen;
    var widget = exports.widget || {};
    var console = exports.console || { log: function () { return; } };

    appsngen.ready(function (eventContext) {
        var prefs = appsngen.prefs.get('greeting');
        var ui = new widget.GreetingUI({
            containerId: 'widget'
        });
        var greeting = new widget.Greeting({
            ui: ui,
            prefs: prefs
        });

        if (widget.debug) {
            console.log('widget launch');
        }

        greeting.init();
    });

    exports.widget = widget;
}(window));