import { ApiProperty } from '@nestjs/swagger';

export class BalanceEntity {
  @ApiProperty()
  success: boolean;
}
