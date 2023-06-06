import { Message } from './message';
import { IHandler } from './handler.interface';

export interface ISubscriber<T extends Message> {
  subscribe(
    queue: string,
    onMessage: (msg: T | null) => Promise<boolean>,
  ): void;
  subscribeWithHandler(queue: string, handler: IHandler<T>): void;
}
