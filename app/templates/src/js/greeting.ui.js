(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var GreetingUI = function (options) {
        this.$container = $('#' + options.containerId);
    };

    GreetingUI.prototype.setGreeting = function (message) {
        var $greeting = this.$container.find('#greeting');

        $greeting.text(message);
    };

    widget.GreetingUI = GreetingUI;
    exports.widget = widget;
}(window));