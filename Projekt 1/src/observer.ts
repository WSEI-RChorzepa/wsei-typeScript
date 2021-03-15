export interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

export interface IObserver {
  update(observer: IObserver): void;
}

export class Subject implements ISubject {
  private observers: IObserver[] = [];

  attach(observer: IObserver): void {
    this.observers.push(observer);
  }
  detach(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notify(): void {
    for (let observer of this.observers) {
      observer.update(observer);
    }
  }
}
