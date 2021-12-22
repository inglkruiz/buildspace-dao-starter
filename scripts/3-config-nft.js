import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import sdk from './1-initialize-sdk.js';

dotenv.config();

if (!process.env.BUNDLEDROP_ADDRESS || process.env.BUNDLEDROP_ADDRESS === '') {
  console.log('🛑 Bundledrop address not found.');
}

const bundleDrop = sdk.getBundleDropModule(process.env.BUNDLEDROP_ADDRESS);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: 'Greedy Joe',
        description: 'This NFT will give you access to Nonsense DAO!',
        image: readFileSync('scripts/assets/member.jpg'),
      },
    ]);
    console.log('✅ Successfully created a new NFT in the drop!');
  } catch (error) {
    console.error('failed to create the new NFT', error);
  }
})();
