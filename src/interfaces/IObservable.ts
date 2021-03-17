import { IObserver } from "./IObserver";

export interface IObservable {
  observers: Map<string, IObserver>;
  subscribe(observer: IObserver): void;
  unsunbscrinbe(observer: IObserver): void;
}
