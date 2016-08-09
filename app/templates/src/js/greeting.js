(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var Greeting = function (options) {
        this.ui = new widget.GreetingUI({
            containerId: options.containerId
        });
        this.prefs = options.prefs;
    };

    Greeting.prototype.init = function () {
        var greetings = [], i;
        var numberOfGreetings = parseInt(this.prefs.numberOfGreetings, 10);
        var changeColor = this.prefs.changeColor === 'true';
        var customColor = this.prefs.greetingCustomColor;

        for (i = 0; i < numberOfGreetings; i++) {
            greetings.push(this.prefs.greeting);
        }

        this.ui.setGreetings(greetings);
        if (changeColor) {
            this.ui.setGreetingsColor(customColor);
        }
    };

    widget.Greeting = Greeting;
    exports.widget = widget;
}(window));
