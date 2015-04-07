/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/request/request.d.ts" />

import Q = require('q');
import request = require('request');
import IHttp = require('./IHttpClient');
import HttpResponse = require('./HttpResponse');

class Http implements IHttp {
  constructor() {
  }

  private handle(method: string, options: request.Options = {}): Q.Promise<HttpResponse> {
    return Q.Promise<HttpResponse>(function(resolve, reject, notify)
    {
      request[method](options, function(error, response, body) {
        if (error === null) {
          resolve(response);
        }
        else {
          reject(error);
        }
      });
    });
  }

  get(options: request.Options = {}): Q.Promise<HttpResponse> {
    return this.handle('get', options);
  }

  put(options: request.Options = {}): Q.Promise<HttpResponse> {
    return this.handle('put', options);
  }
}

export = Http;
