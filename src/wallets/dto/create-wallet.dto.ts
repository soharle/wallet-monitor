import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEthereumAddress,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  @IsEthereumAddress({ message: 'Invalid Ethereum address' })
  @ApiProperty()
  wallet: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  enabled?: boolean = false;
}
