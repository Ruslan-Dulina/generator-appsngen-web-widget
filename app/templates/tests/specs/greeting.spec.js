describe('Greeting module', function () {
    var widget = window.widget;

    it('sets correct number of greetings', function () {
        var uiMock = new widget.GreetingUI();
        var prefsMock = {
            greeting: 'Hello, World!',
            numberOfGreetings: '3',
            changeColor: 'true',
            greetingCustomColor: '#FF0000'
        };
        var target = new widget.Greeting({
            ui: uiMock,
            prefs: prefsMock
        });

        spyOn(uiMock, 'setGreetings');
        target.init();
        expect(uiMock.setGreetings).toHaveBeenCalledWith([prefsMock.greeting, prefsMock.greeting, prefsMock.greeting]);
    });

    it('sets custom greeting color', function () {
        var uiMock = new widget.GreetingUI();
        var prefsMock = {
            greeting: 'Hello, World!',
            numberOfGreetings: '1',
            changeColor: 'true',
            greetingCustomColor: '#FF0000'
        };
        var target = new widget.Greeting({
            ui: uiMock,
            prefs: prefsMock
        });

        spyOn(uiMock, 'setGreetingsColor');
        target.init();
        expect(uiMock.setGreetingsColor).toHaveBeenCalledWith(prefsMock.greetingCustomColor);
    });

    it('doest\'t set custom greeting color', function () {
        var uiMock = new widget.GreetingUI();
        var prefsMock = {
            greeting: 'Hello, World!',
            numberOfGreetings: '1',
            changeColor: 'false',
            greetingCustomColor: '#FF0000'
        };
        var target = new widget.Greeting({
            ui: uiMock,
            prefs: prefsMock
        });

        spyOn(uiMock, 'setGreetingsColor');
        target.init();
        expect(uiMock.setGreetingsColor).not.toHaveBeenCalled();
    });
});