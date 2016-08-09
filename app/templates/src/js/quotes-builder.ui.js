(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var QuotesBuilderUI = function (options) {
        widget.DataBuilderUI.apply(this, arguments);
    };

    QuotesBuilderUI.prototype = Object.create(widget.DataBuilderUI.prototype);
    QuotesBuilderUI.prototype.constructor = QuotesBuilderUI;

    QuotesBuilderUI.prototype.setData = function (quotesData) {
        var template = _.template(this.$dataElementTemplate);

        this.$contentContainer.html(template({
            target: quotesData
        }));

        this.$dataContainer.show();
        this.$eventHolder.trigger('shown.bs.tab');
    };

    widget.QuotesBuilderUI = QuotesBuilderUI;
    exports.widget = widget;
})(window);
