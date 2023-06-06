import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Cron('*/5 * * * * *')
  async handleCron() {
    const date = new Date();
    date.setDate(date.getDate() - 1); //yesterday
    const wallets = await this.prisma.wallet.findMany({
      take: 5,
      orderBy: { lastScan: 'asc' },
      where: {
        OR: [
          {
            lastScan: { lte: date },
          },
          {
            lastScan: null,
          },
        ],
        AND: {
          enabled: true,
        },
      },
    });

    wallets.forEach((wallet) => {
      this.rabbitMQService.send({
        address: wallet.wallet,
      });
    });
  }
}
