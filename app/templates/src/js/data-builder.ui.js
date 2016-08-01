(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var DataBuilderUI = function (options) {
        var that = this;

        widget.WaitingBuilderUI.apply(this, arguments);
        this.$symbolsInput = this.$container.find('#symbolsName');
        this.$symbologyInput = this.$container.find('#symbologyName');
        this.$dataContainer = this.$container.find('.data-container');
        this.$dataElementTemplate = $('#' + options.templateId).text();
        this.$eventHolder = $('[href=#'+ options.containerId + ']');
        this.$contentContainer = this.$dataContainer.find(options.contentContainerSelector);

        this.onPublishButtonClicked = $.noop;
        this.$container.find('.submit-button').on('click', function () {
            that.onRequestButtonClicked();
        });
    };

    DataBuilderUI.prototype = Object.create(widget.WaitingBuilderUI.prototype);
    DataBuilderUI.prototype.constructor = DataBuilderUI;

    DataBuilderUI.prototype.getDataRequest = function () {
        return {
            symbols: this.$symbolsInput.val(),
            symbology: this.$symbologyInput.val()
        };
    };

    DataBuilderUI.prototype.setData = function (quotesData) {
        throw "Not implemented";
    };

    widget.DataBuilderUI = DataBuilderUI;
    exports.widget = widget;
}(window));
