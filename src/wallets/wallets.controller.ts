import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { WalletEntity } from './entities/wallet.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/auth/auth.decorator';

@ApiTags('wallets')
@Controller('wallets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiCreatedResponse({ type: WalletEntity })
  async create(
    @AuthUser() user: UserEntity,
    @Body() createWalletDto: CreateWalletDto,
  ) {
    try {
      const wallet = new WalletEntity(
        await this.walletsService.create(user.id, createWalletDto),
      );
      return wallet;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  @ApiOkResponse({ type: [WalletEntity] })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiQuery({ name: 'enabled', required: false, type: Boolean })
  async findAll(
    @AuthUser() user: UserEntity,
    @Query('enabled') enabled: boolean,
  ) {
    const wallets = await this.walletsService.findAllByUser(user.id, enabled);
    return wallets.map((wallet) => new WalletEntity(wallet));
  }

  @Get(':wallet')
  @ApiOkResponse({ type: WalletEntity })
  async findOne(@AuthUser() user: UserEntity, @Param('wallet') wallet: string) {
    return new WalletEntity(
      await this.walletsService.findOneByUser(user.id, wallet),
    );
  }

  @Patch(':wallet')
  @ApiOkResponse({ type: WalletEntity })
  async update(
    @AuthUser() user: UserEntity,
    @Param('wallet') wallet: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return new WalletEntity(
      await this.walletsService.updateEnabled(user.id, wallet, updateWalletDto),
    );
  }
}
