import { IHandler } from '../../../broker/handler.interface';
import { EtherscanService } from '../../../service/etherscan/etherscan';
import { WalletApiService } from '../../../service/wallet-api/walletapi';
import { EthereumMessage } from './ethereum.message';

export class EthereumHandler implements IHandler<EthereumMessage> {
  async handle(message: EthereumMessage): Promise<boolean> {
    //TODO: change to DI
    const etherScanService: EtherscanService = new EtherscanService();
    const walletService: WalletApiService = new WalletApiService();

    try {
      const resultEtherscan = await etherScanService.getContent(
        message.address,
      );
      const resultApi = await walletService.saveWallet({
        address: message.address,
        balance: resultEtherscan,
      });

      if (!resultApi) {
        console.log('Failed to execute WalletApi');
        return false;
      }
    } catch (e: any) {
      console.log('Failed to execute EthereumHandler', (e as Error).message);
      return false;
    }
    return true;
  }
}
