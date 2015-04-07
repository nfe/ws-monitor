export interface Observer {
  update (arg:any) : void;
}

export class Observable { // or Interface
  private observers : Observer [];

  constructor() {
    this.observers = [];
  }

  public registerObserver (observer : Observer) : void {
    this.observers.push(observer);
  }

  public removeObserver (observer : Observer) : void {
    this.observers.splice(this.observers.indexOf(observer), 1);
  }

  public notifyObservers (arg : any) : void {
    this.observers.forEach((observer : Observer)=> {
      observer.update(arg);
    });
  }
}
