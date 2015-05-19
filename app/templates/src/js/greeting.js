(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var Greeting = function (options) {
        this.ui = options.ui;
        this.prefs = options.prefs;
    };

    Greeting.prototype.init = function () {
        this.ui.setGreeting(this.prefs.greeting);
    };

    widget.Greeting = Greeting;
    exports.widget = widget;
}(window));
