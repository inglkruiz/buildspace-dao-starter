import dotenv from 'dotenv';
import sdk from './1-initialize-sdk.js';

dotenv.config();

if (!process.env.APP_ADDRESS || process.env.APP_ADDRESS === '') {
  console.log('🛑 App address not found.');
}

const app = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: 'Nonsense DAO Governance Token',
      // What's your token's symbol? Ex. "ETH"
      symbol: 'NONS',
    });
    console.log('✅ Successfully deployed token module, address:', tokenModule.address);
  } catch (error) {
    console.error('failed to deploy token module', error);
  }
})();
