(function (exports) {
    /*globals CodeMirror*/
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

        widget.WaitingBuilderUI.apply(this, arguments);
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
            $('[href=#' + options.containerId +']').on('shown.bs.tab', function () {
                initializeCodeMirror();
            });
        }
    };

    RequestBuilderUI.prototype = Object.create(widget.WaitingBuilderUI.prototype);
    RequestBuilderUI.prototype.constructor = RequestBuilderUI;

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

    widget.RequestBuilderUI = RequestBuilderUI;
    exports.widget = widget;
}(window));