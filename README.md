# generator-appsngen-web-widget [![Build Status](https://secure.travis-ci.org/appsngen/generator-appsngen-web-widget.png?branch=master)](https://travis-ci.org/appsngen/generator-appsngen-web-widget)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-appsngen-web-widget from npm, run:

```
$ npm install -g generator-appsngen-web-widget
```

Finally, initiate the generator:

```
$ yo appsngen-web-widget
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

### Widget Structure

After widget template generated it has following structure
|-- documentation
|-- node modules
|-- src
|   |-- css
|   |-- fonts
|   |-- images
|   |-- js
|       |-- dependencies
|   |index.html
|   |application.xml
|-- tests
|   |-- mocks
|   |-- specs
|bower.json
|Gruntfile.js
|package.json

* `/documentation` - folder for placing documentation about widget.
* `/node modules` - node modules used for widget building.
* `/src` - widget sources.
* `/src/application.xml` - config with widget metadata.
* `/src/index.html` - widget main page.
* `/tests` - widget tests using [Jasmine](http://jasmine.github.io/2.0/introduction.html).
* `/bower.json` - widget dependencies. This dependencies used by widget.
* `/Gruntfile.js` - widget build automation file. See [Grunt](http://gruntjs.com) for more details.
* `/package.json` -  dependencies required by Grunt in order to build widget or run it's tests.

### Running Grunt

Building development version of widget, without files minification:

```
$ grunt dev
```

Building production version of widget, with files minification:

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


## License

MIT
