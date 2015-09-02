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
    var start = new Date(Date.now());
    var self = this;
    return Q.Promise<Sample>(function(resolve, reject, notify)
    {
      self._http
          .get(self._options)
          .then(d => {
            resolve(new Sample(start, d.elapsedTime, d.statusCode)); // return promise
          })
          .fail(e => {
            resolve(new Sample(start, 0, 500)); // return promise
          });

    });
  }
}

export = Sampler;
