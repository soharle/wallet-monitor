export const Env = {
  messageBrokerAddress:
    process.env['RABBITMQ_ADDRESS'] || 'amqp://guest:guest@localhost:5672',
  messageBrokerQueue: process.env['RABBITMQ_QUEUE'] || 'wallet-monitor',
  walletApi: process.env['WALLET_API'] || 'http://localhost:3000/wallet',
  tokenWalletApi: process.env['WALLET_API_TOKEN'] || 'developmenttoken',
};
