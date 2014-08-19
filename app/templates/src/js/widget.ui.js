(function (exports) {
    'use strict';
    var webWidget = exports.webWidget || {};

    var WidgetUI = function (options) {
        this.$container = $('#' + options.containerId);
    };

    WidgetUI.prototype.setGreeting = function (message) {
        var $greeting = this.$container.find('#greeting');

        $greeting.text(message);
    };

    webWidget.WidgetUI = WidgetUI;
    exports.webWidget = webWidget;
}(this));