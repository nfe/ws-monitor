/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/request/request.d.ts" />

import Q = require('q');
import request = require('request');
import HttpResponse = require('./HttpResponse');

interface IHttp {
    get(options?: request.Options): Q.Promise<HttpResponse>;

    put(options?: request.Options): Q.Promise<HttpResponse>;

    post(options?: request.Options): Q.Promise<HttpResponse>;
}

export = IHttp;
