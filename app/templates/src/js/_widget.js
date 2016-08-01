(function (exports) {
    'use strict';

    var appsngen = exports.appsngen;
    var widget = exports.widget || {};
    var console = exports.console || { log: function () { return; } };

    appsngen.ready(function (eventContext) {
        var scrollApi;
        var containersIds = [
            <% if (includeGreeting) { %>
            'widget-preferences',
            <% } %>
            <% if (includeEventBuilder) { %>
            'events-context',
            <% } %>
            <% if (includeQuotesDataSource) { %>
            'quotes-data',
            <% } %>
            <% if (includeTimeSeriesDataSource) { %>
            'time-series-data',
            <% } %>
            <% if (includeNewsDataSource) { %>
            'news-data'
            <% } %>
        ];

        <% if (includeGreeting) { %>
        // GREETING
        //jshint unused: true
        var prefs = appsngen.prefs.get();
        var greeting = new widget.Greeting({
            containerId: 'preferences',
            prefs: prefs
        });
        <% } %>

        <% if (includeQuotesDataSource) { %>
        // QUOTES
        var quotesRequestBuilder = new widget.DataBuilder(widget.QuotesBuilderUI, {
            containerId: 'quotes-data',
            dataSourceId: 'epam_systems.mashupengine',
            dataSourcePath: 'Quotes',
            templateId: 'quoteValue',
            contentContainerSelector: '.content-table table'
        });
        <% } %>

        <% if (includeTimeSeriesDataSource) { %>
        // TIMESERIES
        var timeSeriesRequestBuilder = new widget.RequestBuilder({
            containerId: 'time-series-data',
            requestSample: {
                $filter: 'Symbol eq \'EPAM.N\' and Symbology eq \'Ric\' ' +
                'and TimeSeries/FromDate eq datetime\'2015-01-01\' ' +
                'and TimeSeries/ToDate eq datetime\'2015-05-01\' ' +
                'and TimeSeries/Interval eq \'Week\''
            },
            dataSourceId: 'epam_systems.mashupengine',
            dataSourcePath: 'TimeSeries'
        });
        <% } %>

        <% if (includeNewsDataSource) { %>
        // NEWS
        var newsRequestBuilder = new widget.DataBuilder(widget.NewsBuilderUI, {
            containerId: 'news-data',
            dataSourceId: 'epam_systems.mashupengine',
            dataSourcePath: 'News',
            templateId: 'newsValue',
            contentContainerSelector: '.content-container'
        });
        <% } %>
        //jshint unused: false

        <% if (includeEventBuilder) { %>
        // EVENTS
        var eventBuilder = new widget.EventBuilder({
            containerId: 'events-context',
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

        scrollApi = $('.scrollable-container').jScrollPane().data('jsp');
        containersIds.forEach(function (el) {
            $('[href=#' + el + ']').on('shown.bs.tab', function() {
                setTimeout(function () {
                    var tab = $('#'+ el).css('height', 'auto');
                    var containerHeight = $('.scrollable-container').height();

                    if (tab.outerHeight() < containerHeight) {
                        tab.css('height', containerHeight);
                    }
                    scrollApi.reinitialise({
                        contentWidth: scrollApi.getContentWidth()
                    });
                    scrollApi.scrollTo(0, 0);
                }, 0);
            });
        });
        <% } %>

        <% if (includeGreeting) { %>
        greeting.init();
        <% } %>

        exports.addEventListener('resize', function () {
            scrollApi.reinitialise({
                contentWidth: $('body').width()
            });
            if (containersIds.length) {
                $('[href=#' + containersIds[0] + ']').trigger('shown.bs.tab');
            }
        });

        if (containersIds.length) {
            $('[href=#' + containersIds[0] + ']').trigger('click');
        }

        $('.global-waiting').hide();

        if (widget.debug) {
            console.log('widget launched');
        }
    });

    exports.widget = widget;
}(window));
