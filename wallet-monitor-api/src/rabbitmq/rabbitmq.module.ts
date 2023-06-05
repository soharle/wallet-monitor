import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQService as MessagingService } from './rabbitmq.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        exchanges: [
          {
            name: configService.get<string>('RABBITMQ_EXCHANGE_NAME'),
            type: configService.get<string>('RABBITMQ_EXCHANGE_TYPE'),
          },
        ],
        uri: configService.get<string>('RABBITMQ_ADDRESS'),
      }),
      inject: [ConfigService],
    }),
    MessagingModule,
  ],
  controllers: [],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
