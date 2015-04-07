import Rx = require('./rx');
import Sampler = require('./sampler');
import Target = require('./models/target');
import Measurement = require('./models/measurement');

class Sensor extends Rx.Observable {
  private _timer : any;
  private _sampler : Sampler;
  private _measurement : Measurement;

  constructor(target : Target) {
    super();
    this._measurement = new Measurement();
    this._measurement.Target = target;

    this._sampler = new Sampler(this._measurement.Target);
  }

  public start() {
    var self = this;
    this._timer = setInterval(() => self.do(self),
                              this._measurement.Target.Interval);
  }

  public stop() {
    clearInterval(this._timer);
  }

  private do(instance : Sensor) {
    instance._sampler
            .sample()
            .then(function(sample) {

              instance._measurement.IsOK = sample.StatusCode === 200;
              instance._measurement.StateCount += 1;
              instance._measurement.ElapsedTotal += sample.Elapsed;

              if (instance._measurement.Sample == null || sample.StatusCode != instance._measurement.Sample.StatusCode)
              {
                instance._measurement.StatusChangedOn = new Date();
              }

              instance._measurement.Sample = sample;

              instance.notifyObservers(instance._measurement);
            })
            .catch(function(err) {
              console.log('sensor.do.error', err);
            });
  }
}

export = Sensor;
