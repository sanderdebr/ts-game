import { Observer } from "./Observer";

export interface Subject {
  observers: Observer[];
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(any: any): void;
}
