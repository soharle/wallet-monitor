import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createWalletDto: CreateWalletDto) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { wallet: createWalletDto.wallet, userId },
    });

    if (wallet) {
      throw new Error('Wallet already exists for this user');
    }

    const result = this.prisma.wallet.create({
      data: {
        ...createWalletDto,
        userId,
      },
    });

    return result;
  }

  async findAllByUser(userId: number, enabled: boolean) {
    return this.prisma.wallet.findMany({ where: { userId, enabled } });
  }

  async findOneByUser(userId: number, wallet: string) {
    const entity = this.prisma.wallet.findFirst({ where: { userId, wallet } });
    if (!wallet) {
      throw new NotFoundException();
    }
    return entity;
  }

  async updateEnabled(userId: number, wallet: string, UpdateWalletDto) {
    const result = await this.prisma.wallet.updateMany({
      where: { wallet },
      data: UpdateWalletDto,
    });

    return result.count === 1
      ? this.prisma.wallet.findFirst({ where: { wallet } })
      : null;
  }

  async updateBalance(wallet: string, balance: number) {
    const result = await this.prisma.wallet.updateMany({
      where: { wallet },
      data: { balance, lastScan: new Date() },
    });

    return result.count === 1
      ? this.prisma.wallet.findFirst({ where: { wallet } })
      : null;
  }
}
