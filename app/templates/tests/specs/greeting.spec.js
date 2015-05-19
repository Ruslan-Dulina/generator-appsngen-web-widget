describe('Greeting module', function () {
    it('sets greeting', function () {
        var uiMock = new widget.GreetingUI();
        var prefsMock = {
            greeting: 'testGreeting'
        };
        var target = new widget.Greeting({
            ui: uiMock,
            prefs: prefsMock
        });

        spyOn(uiMock, 'setGreeting');
        target.init();
        expect(uiMock.setGreeting).toHaveBeenCalledWith(prefsMock.greeting);
    });
});