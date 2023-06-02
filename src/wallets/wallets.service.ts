import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createWalletDto: CreateWalletDto) {
    const wallet = this.prisma.wallet.findFirst({
      where: { wallet: createWalletDto.wallet, userId },
    });

    if (wallet) {
      throw new Error('Wallet already exists for this user');
    }

    return this.prisma.wallet.create({
      data: {
        ...createWalletDto,
        userId,
      },
    });
  }

  findAllByUser(userId: number, enabled: boolean) {
    return this.prisma.wallet.findMany({ where: { userId, enabled } });
  }

  findOneByUser(userId: number, wallet: string) {
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
}
