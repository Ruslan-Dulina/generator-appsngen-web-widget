(function (exports) {
    'use strict';
    var webApp = exports.webApp || {};
    var ApplicationUI = function (options) {
        this.$container = $('#' + options.containerId);
    };

    ApplicationUI.prototype.setGreeting = function (message) {
        var $greeting = this.$container.find('#greeting');

        $greeting.text(message);
    };

    webApp.ApplicationUI = ApplicationUI;
    exports.webApp = webApp;
}(this));