require('dotenv').load();

import fs = require('fs');
import request = require('request');

import Sensor = require('./sensor');
import ConsoleReporter = require('./console-reporter');
import InfluxDbReporter = require('./influxdb-reporter');
import Target = require('./models/target');

var _certificatePath = "cert.tmp",
    _targetsPath = 'targets.tmp',
    _interval = process.env['NFE_INTERVAL'],
    _certificateUrl = process.env['NFE_CERTIFICATE_URL'],
    _certificatePassword = process.env['NFE_CERTIFICATE_PASSWORD'],
    _targetsUrl = process.env['NFE_TARGETS_URL'],
    _influxdbUrl = process.env['NFE_INFLUXDB_URL'];

console.log('wsmon: env NFE_CERTIFICATE_URL ', _certificateUrl);
console.log('wsmon: env NFE_INFLUXDB_URL ', _influxdbUrl);
console.log('wsmon: env NFE_INTERVAL ', _interval);

// cleaning up temps
if (fs.existsSync(_certificatePath)) {
  fs.unlinkSync(_certificatePath)
}
if (fs.existsSync(_targetsPath)) {
  fs.unlinkSync(_targetsPath)
}

var startProcess = function() {
  if (fs.existsSync(_certificatePath) && fs.existsSync(_targetsPath)) {
    console.log('wsmon: loading target from "' + _targetsPath + '"...');
    var targets = JSON.parse(fs.readFileSync(_targetsPath, 'utf8'));
    var consoleReporter = new ConsoleReporter();
    var influxdbReporter = new InfluxDbReporter(_influxdbUrl);

    console.log('wsmon: creating sensors...');
    targets.forEach(t => {

      var target: Target = {
        Url: t.url,
        Name: t.name,
        Description: t.description,
        Interval: _interval,
        CertificatePath: _certificatePath,
        CertificatePassword: _certificatePassword
      }

      var _sensor = new Sensor(target);
      _sensor.registerObserver(consoleReporter);
      _sensor.registerObserver(influxdbReporter);
      _sensor.start();

    });

    console.log('wsmon: all done!');
    console.log('wsmon: just wait for sensors output!');
  }
};

// download targets.json from url
console.log('wsmon: downloading targets from "' + _targetsUrl + '"...');
request(_targetsUrl).
pipe(fs.createWriteStream(_targetsPath, { flags: "w+" })).
on('finish', startProcess);

// download certificate from url
console.log('wsmon: downloading certificate from "' + _certificateUrl + '"...');
request(_certificateUrl).
pipe(fs.createWriteStream(_certificatePath, { flags: "w+" }));
