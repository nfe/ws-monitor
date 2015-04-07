class Target
{
  public Url : string;
  public Name : string;
  public Description : string;
  public Interval : number;
  public CertificatePath : string;
  public CertificatePassword : string;

  constructor()
  {
    this.Interval = 1000;
  }
}

export = Target;
