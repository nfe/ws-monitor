import Target = require('./target');
import Sample = require('./sample');

class Measurement {
  public Target : Target;
  public Sample : Sample;
  public IsOK : boolean;
  public StateCount : number;
  public ElapsedTotal : number;
  public StatusChangedOn : Date;

  constructor() {
    this.StateCount = 0;
    this.ElapsedTotal = 0;
  }
}

export = Measurement;
