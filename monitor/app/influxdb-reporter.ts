/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/request/request.d.ts" />

import request = require('request');
import Q = require('q');
import Rx = require('./rx');
import Measurement = require('./models/measurement');
import HttpClient = require('./lib/HttpClient');

class FirebaseReporter implements Rx.Observer {

  private _http : HttpClient;
  private _baseUrl : string;

  constructor(url : string) {
    this._http = new HttpClient();
    this._baseUrl = url;
  }

  public update(arg : Measurement) : void {
    if (arg === null || arg.Sample === null)
      return;

    var state = arg.Sample.StatusCode != 200 ? "0" : "1";

    var data = "response_time,name=" + arg.Target.Name + " value=" + arg.Sample.Elapsed + ",state=" + state;
    this._http.post({
      url: this._baseUrl,
      body: data
    }).then(function(a) {
      /*console.log('success', a.statusCode);*/
    }).catch(function(a) {
      /*console.log('error', a.statusCode);*/
    });
  }
}

export = FirebaseReporter;
