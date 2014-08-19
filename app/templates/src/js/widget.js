(function (exports) {
    'use strict';
    var widget = exports.widget || {};
    var Widget = function (options) {
        this.ui = options.ui;
        this.prefs = options.prefs;
    };

    Widget.prototype.init = function () {
        this.ui.setGreeting(this.prefs.greeting);
    };

    widget.Widget = Widget;
    exports.widget = widget;
}(this));
