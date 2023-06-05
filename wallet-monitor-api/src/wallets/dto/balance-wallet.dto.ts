import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class BalanceWalletDto {
  @IsEthereumAddress()
  @IsNotEmpty()
  @ApiProperty()
  wallet: string;

  @ApiProperty()
  @IsNotEmpty()
  balance: string;
}
