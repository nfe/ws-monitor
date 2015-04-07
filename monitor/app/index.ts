import fs = require('fs');

import Sensor = require('./sensor');
import ConsoleReporter = require('./console-reporter');
import FirebaseReporter = require('./firebase-reporter');
import Target = require('./models/target');

var _interval = 25000,
    _certificatePath = process.env['NFE_CERTIFICATE_PATH'],
    _certificatePassword = process.env['NFE_CERTIFICATE_PASSWORD'],
    _firebaseBaseUrl = process.env['NFE_FIREBASE_URL'],
    _targetsPath = './app/targets.json';

// download certificate from url
// download targets.json from url

if (fs.existsSync(_certificatePath) === false) {
  console.log('certificate file not found');
}
if (fs.existsSync(_targetsPath) === false) {
  console.log('targets json file not found');
}
else {
  var targets = JSON.parse(fs.readFileSync(_targetsPath, 'utf8'));
  var consoleReporter = new ConsoleReporter();
  var firebaseReporter = new FirebaseReporter(_firebaseBaseUrl);

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
    _sensor.registerObserver(firebaseReporter);
    _sensor.start();

  });
}
