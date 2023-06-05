import axios from 'axios';
import { EtherscanResult } from './etherscan.result';

export class EtherscanService {
  async getContent(address: string): Promise<string> {
    if (!address) throw new Error('Address is required');

    //check with regex if address is a ethereum address
    if (!address.match(/^0x[a-fA-F0-9]{40}$/))
      throw new Error('Address is not a valid ethereum address');

    try {
      const response = await axios.get<EtherscanResult>(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=Y5Y9T8JFFTEGQ9ZFG7U8QIFW95GP8GX2P2`,
      );

      return response.data.result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('etherscan error message: ', error.message);
        throw error.message;
      } else {
        console.log('etherscan unexpected error: ', error);
        throw 'An unexpected error occurred';
      }
    }
  }
}
