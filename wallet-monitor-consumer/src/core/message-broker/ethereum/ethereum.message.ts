import { Message } from '../../../broker/message';

export class EthereumMessage extends Message {
  content!: EthereumMessageContent;
}

type EthereumMessageContent = {
  address: string;
  user: number;
};
