(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var WaitingBuilderUI = function (options) {
        widget.BaseBuilderUI.apply(this, arguments);
        this.$waiting = this.$container.find('.waiting');
    };

    WaitingBuilderUI.prototype = Object.create(widget.BaseBuilderUI.prototype);
    WaitingBuilderUI.prototype.constructor = WaitingBuilderUI;

    WaitingBuilderUI.prototype.showWaiting = function () {
        this.$waiting.show();
    };

    WaitingBuilderUI.prototype.hideWaiting = function () {
        this.$waiting.hide();
    };

    widget.WaitingBuilderUI = WaitingBuilderUI;
    exports.widget = widget;
})(window);
