/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/request/request.d.ts" />

import Q = require('q');
import request = require('request');
import fs = require('fs');

import Rx = require('./rx');
import HttpClient = require('./lib/HttpClient');
import Target = require('./models/target');
import Sample = require('./models/sample');

class Sampler {
  private _http : HttpClient;
  private _options : request.Options;

  constructor (target : Target) {
    this._http = new HttpClient();
    this._options = {
      url: target.Url,
      timeout: 20000,
      time: true,
      agentOptions: {
        requestCert: true,
        pfx: fs.readFileSync(target.CertificatePath),
        passphrase: target.CertificatePassword,
        rejectUnauthorized: false
      }
    };
  }

  public sample() : Q.Promise<Sample> {

    var sample = new Sample();
    var start = Date.now();
    sample.Timestamp = new Date(start);

    var self = this;

    return Q.Promise<Sample>(function(resolve, reject, notify)
    {
      self._http
          .get(self._options)
          .then(d => {
            sample.Elapsed = d.elapsedTime;
            sample.StatusCode = d.statusCode;

            resolve(sample); // return promise
          })
          .fail(e => {
            sample.Elapsed = 0;
            sample.StatusCode = 500;

            resolve(sample); // return promise
          });

    });
  }
}

export = Sampler;
