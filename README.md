# NFSE-WS-MONITOR

Um projeto para monitoramento dos web services das prefeituras.
[Acompanhe em tempo real o status dos serviços](http://monitor.nfe.io)

## Monitoring App (/monitor)

### Running

This project uses [gulp](http://gulpjs.com/) as its build system.

- Install gulp: `$ npm install -g gulp`

1. Install dependencies: `$ npm install`
2. Build and run: `$ gulp buildrun`


### Testing

This project usings [mocha](http://visionmedia.github.io/mocha/) for unit testing. Install mocha:

- Install mocha: `$ npm install -g mocha`

To compile and test run:

-  `$ gulp test`

## Dashboard (/front)

This project uses [ember.js](http://emberjs.com), [ember-cli](http://embercli.com) and [divshot](http://divshot.com)

### Running

1. Install ember-cli: `$ npm install -g ember-cli`
2. Install dependencies: `$ npm install` and `$ bower install`
3. Run: `$ ember server`

### Deploy

1. Install divshot-cli: `$ npm install -g divshot-cli`
2. Change `name` property on .divshot.json to the appropriated value
3. Login: `$ divshot login`
4. Deploy: `$ divshot push production`

## License

MIT
