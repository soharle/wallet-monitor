import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateWalletDto {
  @IsBoolean()
  @ApiProperty()
  enabled: boolean;
}
