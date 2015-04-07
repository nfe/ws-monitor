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

    var state = arg.Sample.StatusCode != 200 ? "DOWN" : "UP";
    this._http.put({
      url: this._baseUrl + "/ws/" + arg.Target.Name + ".json",
      body: JSON.stringify({
        name: arg.Target.Name,
        description: arg.Target.Description,
        state: state,
        count: arg.StateCount,
        lastStatus: arg.Sample.StatusCode,
        lastResponseTime: arg.Sample.Elapsed,
        totalResponseTime: arg.ElapsedTotal,
        statusChangedOn: arg.StatusChangedOn.toUTCString()
      })
    }).then(function() {
    });
  }
}

export = FirebaseReporter;
