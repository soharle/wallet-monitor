import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  create(createWalletDto: CreateWalletDto) {
    return this.prisma.wallet.create({ data: createWalletDto });
  }

  findAll() {
    return this.prisma.wallet.findMany({ where: { enabled: true } });
  }

  findAllDisabled() {
    return this.prisma.wallet.findMany({ where: { enabled: false } });
  }

  findOne(wallet: string) {
    const entity = this.prisma.wallet.findFirst({ where: { wallet } });
    if (!wallet) {
      throw new NotFoundException(`Wallet ${wallet} not found`);
    }
    return entity;
  }

  async updateEnabled(wallet: string, UpdateWalletDto) {
    const result = await this.prisma.wallet.updateMany({
      where: { wallet },
      data: UpdateWalletDto,
    });

    return result.count === 1
      ? this.prisma.wallet.findFirst({ where: { wallet } })
      : null;
  }
}
