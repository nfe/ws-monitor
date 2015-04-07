interface HttpResult {
    body: any;
    statusCode?: number;
    elapsedTime?: number;
    headers?: any;
}

export = HttpResult;
