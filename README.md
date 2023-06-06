
# Wallet Monitor

Wallet Monitor is a mini-project of an API designed to monitor balances of web3 wallets. Currently, the project exclusively supports Ethereum wallets, utilizing the Etherscan API for balance queries.

The project is a monorepo consisting of two applications:

  - *wallet-monitor-api*:
    This is the main API with authentication and authorization capabilities. Users can register wallets associated with their accounts.

  - *wallet-monitor-consumer*:
    This is a worker that listens for new wallets in a RabbitMQ messaging system. It queries the Etherscan API for balances and returns the results to the API.


It's worth noting that intentional overengineering was incorporated into the project to facilitate practice and skill development.

---

## Getting Started

These instructions will guide you through setting up and running the Wallet Monitor project locally.

---

## Step 1: Setting up Dependencies

1. Navigate to the root folder of the project.

2. Run the following command to start the PostgreSQL database and RabbitMQ message broker using Docker:

   ```bash
   docker-compose up -d
   ```
    >  This command launches the necessary services in the background.

---

## Step 2: Setting up Wallet Monitor API

Change your current directory to wallet-monitor-api:

```bash
cd wallet-monitor-api
```

Create a .env file in the wallet-monitor-api directory and populate it with the required environment variables. Refer to the .env.example file for the necessary configuration values.

Install the project dependencies by running the following command:

```bash
npm install
```

After the dependencies are installed, generate the Prisma client by executing the following command:

```bash
npx prisma generate
```

Start the API in development mode:

```bash
npm run start:dev
```


The Wallet Monitor API is now running and accessible locally.

--- 
## Step 3: Setting up Wallet Monitor Consumer

Change your current directory to wallet-monitor-consumer:

```bash
cd ../wallet-monitor-consumer
```

Moving on to the wallet-monitor-consumer application, first, locate the configuration file located at src/infrastructure/env.ts and make any necessary changes to adapt it to your environment.

Change your current directory to wallet-monitor-consumer:

```bash
cd ../wallet-monitor-consumer
```


Install the dependencies by running:

```bash
npm install
```


Once the dependencies are installed, start the consumer worker in development mode using the following command:

```bash
npm run start:dev
```

This command will launch the Wallet Monitor Consumer, allowing it to listen for new wallets and query the Etherscan API.

---

## Future Enhancements

Here are some potential improvements and additions that can be made to the Wallet Monitor project:

- **Unit Testing**: Implement unit tests to ensure the reliability and correctness of the codebase. This will help catch any potential issues and facilitate code maintenance and refactoring in the future.

- **Improved Logging**: Enhance the logging capabilities of both the Wallet Monitor API and Wallet Monitor Consumer. Implement a more robust logging system to provide better visibility into the application's behavior and facilitate debugging and troubleshooting.

- **Support for Other Wallet Types**: Expand the project's capabilities by adding support for additional wallet types beyond Ethereum. This could include wallets for other cryptocurrencies such as Bitcoin, Litecoin, or popular decentralized finance (DeFi) platforms.

Feel free to contribute to the project by implementing any of these enhancements or exploring other innovative features that can further improve the Wallet Monitor application.
