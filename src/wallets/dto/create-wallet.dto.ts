import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty()
  wallet: string;

  @ApiProperty({ required: false, default: false })
  enabled?: boolean = false;
}
