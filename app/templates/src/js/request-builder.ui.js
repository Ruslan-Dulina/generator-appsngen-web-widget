(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var RequestBuilderUI = function (options) {
        var that = this;
        var codeMirrorInitialized = false;
        var initializeCodeMirror = function () {
            if (!codeMirrorInitialized) {
                setTimeout(function (){
                    var requestString = options.requestSampleString || '{}';
                    var responseString = options.responseSampleString ||
                        'please press "make request" button to get response';

                    that.outgoingEventEditor = new CodeMirror(that.$outgoingEventEditor[0], {
                        mode: 'application/javascript',
                        lineNumbers: true,
                        value: requestString

                    });

                    that.incomingEventEditor = new CodeMirror(that.$incomingEventEditor[0], {
                        mode: 'application/javascript',
                        lineNumbers: true,
                        value: responseString
                    });
                });

                codeMirrorInitialized = true;
            }
        };

        this.$container = $('#' + options.containerId);
        this.$waiting = this.$container.find('.waiting');
        this.$error = this.$container.find('.error');
        this.$outgoingEventEditor = this.$container.find('.request-editor');
        this.$incomingEventEditor = this.$container.find('.response-editor');

        this.onPublishButtonClicked = $.noop;

        this.$container.find('.submit-button').on('click', function () {
            that.onPublishButtonClicked();
        });

        // codemirror fails to initialize in hidden state
        if (this.$container.is(':visible')) {
            initializeCodeMirror();
        } else {
            this.$container.on('show.bs.collapse', function () {
                initializeCodeMirror();
            });
        }

        this.$error.find('button').on('click', function () {
            that.hideError();
        });
    };

    RequestBuilderUI.prototype.setRequestString = function (requestString) {
        this.outgoingEventEditor.getDoc().setValue(requestString);
    };

    RequestBuilderUI.prototype.getRequestString = function () {
        return this.outgoingEventEditor.getDoc().getValue();
    };

    RequestBuilderUI.prototype.setResponseString = function (requestString) {
        this.incomingEventEditor.getDoc().setValue(requestString);
    };

    RequestBuilderUI.prototype.getResponseString = function () {
        return this.incomingEventEditor.getDoc().getValue();
    };

    RequestBuilderUI.prototype.showWaiting = function () {
        this.$waiting.show();
    };

    RequestBuilderUI.prototype.hideWaiting = function () {
        this.$waiting.hide();
    };

    RequestBuilderUI.prototype.showError = function (message) {
        this.$error.find('p').text('Sorry, error occurred. ' + message);
        this.$error.show('fast');
    };

    RequestBuilderUI.prototype.hideError = function () {
        this.$error.hide('fast');
    };

    widget.RequestBuilderUI = RequestBuilderUI;
    exports.widget = widget;
}(window));