(function (exports) {
    var widget = exports.widget || {};

    widget.GreetingUI = function (options) {
    };

    widget.GreetingUI.prototype.setGreetings = jasmine.createSpy('setGreetings');
    widget.GreetingUI.prototype.setGreetingsColor = jasmine.createSpy('setGreetingsColor');

    exports.widget = widget;
}(window));
