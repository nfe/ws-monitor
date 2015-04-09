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
  private _url : string;
  private _http : HttpClient;
  private _certificatePath : string;
  private _certificatePassword : string;

  constructor (target : Target) {
    this._url = target.Url;
    this._certificatePath = target.CertificatePath;
    this._certificatePassword = target.CertificatePassword;
    this._http = new HttpClient();
  }

  public sample() : Q.Promise<Sample> {

    var sample = new Sample();
    var start = Date.now();
    sample.Timestamp = new Date(start);

    var options: request.Options = {
      url: this._url,
      timeout: 20000,
      time: true,
      agentOptions: {
        requestCert: true,
        pfx: fs.readFileSync(this._certificatePath),
        passphrase: this._certificatePassword,
        rejectUnauthorized: false
      }
    };

    var self = this;

    return Q.Promise<Sample>(function(resolve, reject, notify)
    {
      self._http
          .get(options)
          .then(d => {

            sample.Elapsed = d.elapsedTime;
            sample.StatusCode = d.statusCode;

            resolve(sample); // return promise
          })
          .fail(e => {

            if (e.elapsedTime === null || e.elapsedTime === undefined) {
              sample.Elapsed = new Date(Date.now() - start).getMilliseconds();
            }
            else {
              sample.Elapsed = e.elapsedTime;
            }

            sample.StatusCode = 500;

            resolve(sample); // return promise
          });

    });
  }
}

export = Sampler;
