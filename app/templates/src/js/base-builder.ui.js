(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var BaseBuilderUI = function (options) {
        var that = this;

        this.$container = $('#' + options.containerId);
        this.$error = this.$container.find('.error');

        this.$error.find('button').on('click', function () {
            that.hideError();
        });
    };

    BaseBuilderUI.prototype.showError = function (message) {
        this.$error.find('p').text('Sorry, error occurred. ' + message);
        this.$error.show('fast');
    };

    BaseBuilderUI.prototype.hideError = function () {
        this.$error.hide('fast');
    };

    widget.BaseBuilderUI = BaseBuilderUI;
    exports.widget = widget;
})(window);
