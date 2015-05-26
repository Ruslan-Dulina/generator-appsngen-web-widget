(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var prettifyJSON = function (obj) {
        return JSON.stringify(obj, null, 4);
    };

    var EventBuilder = function (options) {
        this.ui = new widget.EventBuilderUI({
            containerId: options.containerId,
            defaultEventChannel: 'SINGLE_INSTRUMENT',
            defaultContext: 'Initial event context:\n' + prettifyJSON(options.initialContext),
            onPublishButtonClicked: this.onPublishButtonClicked.bind(this),
            onEventChannelChanged: this.onEventChannelChanged.bind(this)
        });

        this.events = options.events;
        this.onEventPublished = options.onEventPublished || $.noop;
    };

    EventBuilder.prototype.processEvent = function (channel, data) {
        this.ui.setIncomingEventString('Event from channel ' + channel + ':\n' + prettifyJSON(data));
    };

    EventBuilder.prototype.onEventChannelChanged = function (eventChanel) {
        var event, i;

        for (i = 0; i < this.events.length; i++) {
            if (this.events[i].channel === eventChanel) {
                event = this.events[i];
                break;
            }
        }

        if (event) {
            this.ui.setOutgoingEventString(prettifyJSON(event.sample));
        } else {
            throw new Error('unexpected event channel: ' + eventChanel);
        }
    };

    EventBuilder.prototype.onPublishButtonClicked = function () {
        var eventChannel = this.ui.getOutgoingEventType();
        var eventDataString = this.ui.getOutgoingEventString();
        var eventData;
        try {
            eventData = JSON.parse(eventDataString);
        } catch (ex) {
            console.error(ex);
            this.ui.showError('Event JSON is not valid.');
            return;
        }

        this.onEventPublished(eventChannel, eventData);
    };

    widget.EventBuilder = EventBuilder;
    exports.widget = widget;
}(window));

