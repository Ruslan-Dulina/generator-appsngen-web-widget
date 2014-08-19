(function (exports) {
    'use strict';
    var webWidget = exports.webWidget || {};

    var Widget = function (options) {
        this.ui = options.ui;
        this.prefs = options.prefs;
    };

    Widget.prototype.init = function () {
        this.ui.setGreeting(this.prefs.greeting);
    };

    webWidget.Widget = Widget;
    exports.webWidget = webWidget;
}(this));
