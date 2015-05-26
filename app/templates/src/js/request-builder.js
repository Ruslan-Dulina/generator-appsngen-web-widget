(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var prettifyJSON = function (obj) {
        return JSON.stringify(obj, null, 4);
    };

    var RequestBuilder = function (options) {
        this.ui = new widget.RequestBuilderUI({
            containerId: options.containerId,
            requestSampleString: prettifyJSON(options.requestSample)
        });
        this.dataSourceId = options.dataSourceId;
        this.dataSourcePath = options.dataSourcePath;
        this.ui.onPublishButtonClicked = this.onPublishButtonClicked.bind(this);
    };

    RequestBuilder.prototype.onPublishButtonClicked = function () {
        var paramsString = this.ui.getRequestString();
        var params, request;

        try {
            params = JSON.parse(paramsString);
        } catch (e) {
            console.error(e);
            this.ui.showError('Request  JSON is not valid.');
            return;
        }

        this.ui.showWaiting();
        this.ui.hideError();
        request = {
            params: params,
            dataSourceId: this.dataSourceId,
            headers: {
                'Accept': 'application/json'
            },
            path: this.dataSourcePath
        };
        appsngen.ajax(request)
            .success(function (response) {
                this.ui.setResponseString(prettifyJSON(response));
                this.ui.hideWaiting();
            }.bind(this))
            .error(function (error) {
                this.ui.setResponseString(prettifyJSON(error) || 'sorry, unspecified error occurred during request');
                this.ui.hideWaiting();
            }.bind(this));
    };

    widget.RequestBuilder = RequestBuilder;
    exports.widget = widget;
}(window));

