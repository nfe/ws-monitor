import Rx = require('./rx');
import Measurement = require('./models/measurement');

class ConsoleReporter implements Rx.Observer {
  public update(arg : Measurement) : void {
    console.log(
      arg.StateCount,
      (new Date).toUTCString(),
      arg.Sample.StatusCode,
      arg.Sample.Elapsed,
      arg.Target.Url
    );
  }
}

export = ConsoleReporter;
