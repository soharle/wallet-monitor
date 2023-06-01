import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '@prisma/client';

export class WalletEntity implements Wallet {
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

  @ApiProperty()
  updatedAt: Date;
}
