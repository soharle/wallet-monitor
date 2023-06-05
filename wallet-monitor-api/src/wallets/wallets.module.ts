import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessagingModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService],
  imports: [PrismaModule, MessagingModule],
})
export class WalletsModule {}
