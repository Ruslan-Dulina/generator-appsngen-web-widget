describe('Application module', function () {
    it('sets greeting', function () {
        var uiMock = new webApp.ApplicationUI();
        var prefsMock = {
            greeting: 'testGreeting'
        };
        var target = new webApp.Application({
            ui: uiMock,
            prefs: prefsMock
        });

        spyOn(uiMock, 'setGreeting');
        target.init();
        expect(uiMock.setGreeting).toHaveBeenCalledWith(prefsMock.greeting);
    });
});