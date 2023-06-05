import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class WalletEntity implements Wallet {
  constructor(partial: Partial<WalletEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  wallet: string;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  lastScan: Date;

  @ApiProperty()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
