(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var GreetingUI = function (options) {
        this.$container = $('#' + options.containerId);
        this.$greeting = this.$container.find('.greeting-text');
    };

    GreetingUI.prototype.setGreetings = function (greetings) {
        var i;

        this.$greeting.html('');
        for (i = 0; i < greetings.length; i++) {
            this.$greeting.append('<span>' + greetings[i] + '</span><br/>');
        }
    };

    GreetingUI.prototype.setGreetingsColor = function (color) {
        this.$greeting.css('color', color);
    };

    widget.GreetingUI = GreetingUI;
    exports.widget = widget;
}(window));
