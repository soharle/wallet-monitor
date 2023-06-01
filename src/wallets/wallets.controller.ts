import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletEntity } from './entities/wallet.entity';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiCreatedResponse({ type: WalletEntity })
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  @ApiOkResponse({ type: [WalletEntity] })
  findAll() {
    return this.walletsService.findAll();
  }

  @Get('disabled')
  @ApiOkResponse({ type: [WalletEntity] })
  findAllDisabled() {
    return this.walletsService.findAllDisabled();
  }

  @Get(':id')
  @ApiOkResponse({ type: WalletEntity })
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: WalletEntity })
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WalletEntity })
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id);
  }
}
