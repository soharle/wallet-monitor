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
  async create(@Body() createWalletDto: CreateWalletDto) {
    return new WalletEntity(await this.walletsService.create(createWalletDto));
  }

  @Get()
  @ApiOkResponse({ type: [WalletEntity] })
  async findAll() {
    const wallets = await this.walletsService.findAll();
    return wallets.map((wallet) => new WalletEntity(wallet));
  }

  @Get('disabled')
  @ApiOkResponse({ type: [WalletEntity] })
  async findAllDisabled() {
    const wallets = await this.walletsService.findAllDisabled();
    return wallets.map((wallet) => new WalletEntity(wallet));
  }

  @Get(':wallet')
  @ApiOkResponse({ type: WalletEntity })
  async findOne(@Param('wallet') wallet: string) {
    return new WalletEntity(await this.walletsService.findOne(wallet));
  }

  @Patch(':wallet')
  @ApiOkResponse({ type: WalletEntity })
  async update(
    @Param('wallet') wallet: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return new WalletEntity(
      await this.walletsService.updateEnabled(wallet, updateWalletDto),
    );
  }
}
