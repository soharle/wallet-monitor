import * as amqp from 'amqplib';
import * as broker from '../message';
import { Env } from '../../infrastructure/env';
import { IHandler } from '../handler.interface';
import { ISubscriber } from '../subscriber.interface';

export class RabbitSubscriber<T extends broker.Message>
  implements ISubscriber<T>
{
  subscribe(queue: string, onMessage: (msg: T) => Promise<boolean>): void {
    amqp.connect(Env.messageBrokerAddress).then((connection) => {
      var ok = connection.createChannel();
      ok.then((channel) => {
        channel.assertQueue(queue);
        channel.consume(queue, async (message) => {
          if (message) {
            const body = <T>JSON.parse(message.content.toString());
            if (body) {
              var result = await onMessage(body);
              console.log('Message consumed', result);
              result
                ? channel.ack(message)
                : channel.nack(message, false, false);
            }
          }
        });
      });
    });
  }

  subscribeWithHandler(queue: string, handler: IHandler<T>): void {
    this.subscribe(queue, handler.handle);
  }
}
