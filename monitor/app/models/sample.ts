class Sample
{
  public Timestamp : Date;
  public StatusCode : number;
  public Elapsed : number;

  constructor(timestamp: Date = null, elapsed: number = null, statusCode: number = null) {
      this.Timestamp = timestamp;
      this.StatusCode = statusCode;
      this.Elapsed = elapsed;
  }
}

export = Sample;
