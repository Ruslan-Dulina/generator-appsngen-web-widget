(function (exports) {
    'use strict';

    var widget = exports.widget || {};

    var DataBuilder = function (UIBuilder, options) {
        this.ui = new UIBuilder({
            containerId: options.containerId,
            templateId: options.templateId,
            contentContainerSelector: options.contentContainerSelector
        });
        this.dataSourceId = options.dataSourceId;
        this.dataSourcePath = options.dataSourcePath;
        this.ui.onRequestButtonClicked = this.onRequestButtonClicked.bind(this);
    };

    DataBuilder.prototype.onRequestButtonClicked = function () {
        var request;
        var requestParams = this.ui.getDataRequest();
        var paramsString = requestParams.symbols.split('|').map(function (el) {
            return 'Symbol eq \'' + el + '\'';
        }).join(' or ');
        paramsString += 'and Symbology eq \'' + requestParams.symbology + '\'';

        this.ui.showWaiting();
        this.ui.hideError();
        request = {
            params: {
                $filter: paramsString
            },
            dataSourceId: this.dataSourceId,
            headers: {
                'Accept': 'application/json'
            },
            path: this.dataSourcePath
        };

        appsngen.ajax(request)
            .success(function (response) {
                this.ui.setData(response.value);
                this.ui.hideWaiting();
            }.bind(this))
            .error(function (error) {
                var errorMessage = error['odata.error'];
                errorMessage = errorMessage && errorMessage.message && errorMessage.message.value;
                this.ui.showError(errorMessage || 'Unspecified error during request');
                this.ui.hideWaiting();
            }.bind(this));
    };

    widget.DataBuilder = DataBuilder;
    exports.widget = widget;
}(window));
