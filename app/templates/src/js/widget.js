(function (exports) {
    //'use strict';

    var appsngen = exports.appsngen;
    var widget = exports.widget || {};
    var console = exports.console || { log: function () { return; } };

    appsngen.ready(function (eventContext) {
        var prefs = appsngen.prefs.get('greeting');
        var scrollApi;

        // GREETING
        var greeting = new widget.Greeting({
            containerId: 'preferences',
            prefs: prefs
        });

        // QUOTES
        var quotesRequestBuilder = new widget.RequestBuilder({
            containerId: 'quotes-request-builder',
            requestSample: {
                $filter: 'Symbol eq \'EPAM.N\' and Symbology eq \'Ric\''
            },
            dataSourceId: 'epam_systems.mashupengine',
            dataSourcePath: 'Quotes'
        });

        // TIMESERIES
        var timeSeriesRequestBuilder = new widget.RequestBuilder({
            containerId: 'time-series-request-builder',
            requestSample: {
                $filter: 'Symbol eq \'EPAM.N\' and Symbology eq \'Ric\' ' +
                    'and TimeSeries/FromDate eq datetime\'2015-01-01\' ' +
                    'and TimeSeries/ToDate eq datetime\'2015-05-01\' ' +
                    'and TimeSeries/Interval eq \'Week\''
            },
            dataSourceId: 'epam_systems.mashupengine',
            dataSourcePath: 'TimeSeries'
        });

        // NEWS
        var newsRequestBuilder = new widget.RequestBuilder({
            containerId: 'news-request-builder',
            requestSample: {
                $filter: 'Symbol eq \'EPAM.N\' and Symbology eq \'Ric\''
            },
            dataSourceId: 'epam_systems.mashupengine',
            dataSourcePath: 'News'
        });

        // EVENTS
        var eventBuilder = new widget.EventBuilder({
            containerId: 'events',
            events: [
                {
                    channel: 'SINGLE_INSTRUMENT',
                    sample: {
                        value: 'EPAM.N',
                        type: 'RIC'
                    }
                },
                {
                    channel: 'MULTIPLE_INSTRUMENTS',
                    sample: {
                        value: ['EPAM.N', 'MSFT.O', 'IBM.N'],
                        type: 'RIC'
                    }
                }
            ],
            initialContext: eventContext,
            onEventPublished: function (channel, data) {
                appsngen.events.publish(channel, data);
            }
        });

        appsngen.events
            .subscribe('SINGLE_INSTRUMENT', function (channel, data) {
                eventBuilder.processEvent(channel, data);
            })
            .subscribe('MULTIPLE_INSTRUMENTS', function (channel, data) {
                eventBuilder.processEvent(channel, data);
            });

        greeting.init();

        scrollApi = $('.scrollable-container').scrollableContainer({
            contentWidth: '0px'
        }).data('bs.sc');

        $('#features-accordion').on('hidden.bs.collapse shown.bs.collapse', function () {
            scrollApi.refresh();
        });

        $('.global-waiting').hide();

        if (widget.debug) {
            console.log('widget launched');
        }
    });

    exports.widget = widget;
}(window));