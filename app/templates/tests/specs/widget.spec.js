describe('Widget module', function () {
    it('sets greeting', function () {
        var uiMock = new webWidget.WidgetUI();
        var prefsMock = {
            greeting: 'testGreeting'
        };
        var target = new webWidget.Widget({
            ui: uiMock,
            prefs: prefsMock
        });

        spyOn(uiMock, 'setGreeting');
        target.init();
        expect(uiMock.setGreeting).toHaveBeenCalledWith(prefsMock.greeting);
    });
});