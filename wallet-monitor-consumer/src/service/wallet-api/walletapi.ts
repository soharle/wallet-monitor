import axios from 'axios';
import { Env } from '../../infrastructure/env';
import { ResultWalletApi } from './walletapi.result';
import { PayloadWalletApi } from './walletapi.payload';

export class WalletApiService {
  async sendBalance(message: PayloadWalletApi): Promise<boolean> {
    try {
      const result = await axios.post<ResultWalletApi>(Env.walletApi, message, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Env.tokenWalletApi,
        },
      });

      if (result.status != 200) {
        return false;
      }
    } catch (e: any) {
      console.log('Failed to execute WalletApi', (e as Error).message);
      return false;
    }

    return true;
  }
}
