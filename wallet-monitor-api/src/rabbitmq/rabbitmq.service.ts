import { ConfigService } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RabbitMQService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private configService: ConfigService,
  ) {}
  public send(data: any) {
    this.amqpConnection.publish(
      this.configService.get<string>('RABBITMQ_EXCHANGE_NAME'),
      this.configService.get<string>('RABBITMQ_ROUTING_KEY'),
      data,
    );
  }
}
