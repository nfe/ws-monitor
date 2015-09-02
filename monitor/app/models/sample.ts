class Sample
{
  public Timestamp : Date;
  public StatusCode : number;
  public Elapsed : number;

  constructor(timestamp: Date, elapsed: number, statusCode: number) {
      this.Timestamp = timestamp;
      this.StatusCode = statusCode;
      this.Elapsed = elapsed;
  }
}

export = Sample;
