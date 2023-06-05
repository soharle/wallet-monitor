import { BrokerStartup } from './broker/broker-startup';
import { EthereumHandler } from './core/message-broker/ethereum/ethereum.handler';
import { Env } from './infrastructure/env';

const server = new BrokerStartup(Env.messageBrokerQueue, new EthereumHandler());

console.log('Starting server');
server.Run();
