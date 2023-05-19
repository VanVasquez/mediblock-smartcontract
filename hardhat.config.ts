import 'dotenv/config';
import "@nomicfoundation/hardhat-toolbox";
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'; 

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || 'https://eth-sepolia/example';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'key';
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || 'key';

const config: any = {
  defaultNetwork: 'hardhat',
  solidity: "0.8.8",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      chainId: 11155111,
      accounts: [PRIVATE_KEY],
      url: SEPOLIA_RPC_URL,
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    outputFile: 'gas-reporter.txt',
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: 'ETH',
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }, 
  },
};

export default config;
