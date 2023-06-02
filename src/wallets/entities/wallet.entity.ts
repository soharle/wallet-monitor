import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';

export class WalletEntity implements Wallet {
  constructor({ user, ...data }: Partial<WalletEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
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
  user: UserEntity;

  @ApiProperty()
  lastScan: Date;

  @ApiProperty()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
