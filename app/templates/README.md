# Example Widget

## Widget Structure

After widget template generated it has following structure:

|-- dist  
|-- documentation  
|-- node modules  
|-- src  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- css  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- fonts  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- images  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- js  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- dependencies  
|&nbsp;&nbsp;&nbsp;&nbsp;|index.html  
|&nbsp;&nbsp;&nbsp;&nbsp;|application.xml  
|-- tests  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- mocks  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- specs  
|bower.json  
|Gruntfile.js  
|package.json  

* `/dist` - automatically generated folder with widget build or test run results output.
* `/documentation` - folder for placing documentation about widget.
* `/node modules` - node modules used for widget building.
* `/src` - widget sources.
* `/src/application.xml` - config with widget metadata.
* `/src/index.html` - widget main page.
* `/tests` - widget tests using [Jasmine](http://jasmine.github.io/2.0/introduction.html).
* `/bower.json` - widget dependencies. This dependencies used by widget.
* `/Gruntfile.js` - widget build automation file. See [Grunt](http://gruntjs.com) for more details.
* `/package.json` -  dependencies required by Grunt in order to build widget or run it's tests.

## Running Grunt

Build development version of widget, without files minification:

```
$ grunt dev
```

Build production version of widget, with files minification:

```
$ grunt 
```

Run [JSLint](http://www.jslint.com/):

```
$ grunt jslint-check
```

Run [Jasmine](http://jasmine.github.io/2.0/introduction.html) tests with code coverage:

```
$ grunt test
```

After grunt command run output zip archive will be created at `dist` folder. This archive can be uploaded to [Sandbox](https://www.appsngen.com/product/my/applications/list).

## License

MIT
