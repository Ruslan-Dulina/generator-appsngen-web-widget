(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var EventBuilderUI = function (options) {
        var that = this;
        var codeMirrorInitialized = false;
        var initializeCodeMirror = function () {
            if (!codeMirrorInitialized) {
                setTimeout(function (){
                    that.outgoingEventEditor = new CodeMirror(that.$outgoingEventEditor[0], {
                        mode: 'application/javascript',
                        lineNumbers: true
                    });

                    that.incomingEventEditor = new CodeMirror(that.$incomingEventEditor[0], {
                        mode: 'application/javascript',
                        lineNumbers: true,
                        value: options.defaultContext || 'no events received so far'
                    });

                    that.setOutgoingEventChannel(options.defaultEventChannel);
                });

                codeMirrorInitialized = true;
            }
        };

        this.$container = $('#' + options.containerId);
        this.$error = this.$container.find('.error');
        this.eventSelectorApi = this.$container.find('.event-selector')
            .dropdown()
            .on('valueChanged', function (e, newValue) {
                that.onEventChannelChanged(newValue);
            })
            .data('bs.dropdown');
        this.$outgoingEventEditor = this.$container.find('.outgoing-event-editor');
        this.$incomingEventEditor = this.$container.find('.incoming-event-editor');

        this.onPublishButtonClicked = options.onPublishButtonClicked || $.noop;
        this.onEventChannelChanged = options.onEventChannelChanged || $.noop;

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

    EventBuilderUI.prototype.getOutgoingEventType = function () {
        return this.eventSelectorApi.getValue();
    };

    EventBuilderUI.prototype.setOutgoingEventChannel = function (eventType) {
        return this.eventSelectorApi.setValue(eventType);
    };

    EventBuilderUI.prototype.setOutgoingEventString = function (eventString) {
        this.outgoingEventEditor.getDoc().setValue(eventString);
    };

    EventBuilderUI.prototype.getOutgoingEventString = function () {
        return this.outgoingEventEditor.getDoc().getValue();
    };

    EventBuilderUI.prototype.setIncomingEventString = function (eventString) {
        this.incomingEventEditor.getDoc().setValue(eventString);
    };

    EventBuilderUI.prototype.getIncomingEventString = function () {
        return this.incomingEventEditor.getDoc().getValue();
    };

    EventBuilderUI.prototype.showError = function (message) {
        this.$error.find('p').text('Sorry, error occurred. ' + message);
        this.$error.show('fast');
    };

    EventBuilderUI.prototype.hideError = function () {
        this.$error.hide('fast');
    };

    widget.EventBuilderUI = EventBuilderUI;
    exports.widget = widget;
}(window));