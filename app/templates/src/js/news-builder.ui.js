(function (exports) {
    'use strict';
    var widget = exports.widget || {};

    var NewsBuilderUI = function (options) {
        var that = this;

        widget.DataBuilderUI.apply(this, arguments);
        this.$fullNewsContainer = this.$container.find('.news-container');
        this.$container.on('click', 'a', function (event) {
            var data = $(event.target.parentElement.parentElement).data();
            var container = that.$fullNewsContainer;

            container.find('.news-header').text(data.header);
            container.find('.news-full').text(data.body);
            container.show();
        });
        this.$fullNewsContainer.on('click', '.back', function () {
            that.$fullNewsContainer.hide();
        });
    };

    NewsBuilderUI.prototype = Object.create(widget.DataBuilderUI.prototype);
    NewsBuilderUI.prototype.constructor = NewsBuilderUI;

    NewsBuilderUI.prototype.setData = function (newsData) {
        var i, j, newsElement, newsObject;
        var that = this;
        var template = _.template(this.$dataElementTemplate);

        this.$contentContainer[0].innerHTML = '';
        for (i = 0; i < newsData.length; i++) {
            if (newsData[i].Errors.length > 0) {
                this.showError(newsData[i].Errors[0].Message);
                return;
            }

            for (j = 0; j < newsData[i].NewsItems.length; j++) {
                newsObject = newsData[i].NewsItems[j];
                newsElement = $(template({
                    header: newsObject.Header,
                    date: (new Date(newsObject.Date)).toGMTString(),
                    image: newsObject.Images[0]
                }));
                newsElement.data('header', newsObject.Header);
                newsElement.data('body', newsObject.Body);
                this.$contentContainer.append(newsElement);
            }
        }

        this.$dataContainer.show();
        this.$eventHolder.trigger('shown.bs.tab');
    };

    widget.NewsBuilderUI = NewsBuilderUI;
    exports.widget = widget;
})(window);
