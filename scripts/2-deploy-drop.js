import dotenv from 'dotenv';
import ethers from 'ethers';
import { readFileSync } from 'fs';
import sdk from './1-initialize-sdk.js';

dotenv.config();

if (!process.env.APP_ADDRESS || process.env.APP_ADDRESS === '') {
  console.log('🛑 App address not found.');
}

const app = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: 'Nonsense DAO Membership',
      description: 'A DAO for people that believes crypto investments are driven by nonsense.',
      image: readFileSync('scripts/assets/nonsense.png'),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log('✅ Successfully deployed bundleDrop module, address:', bundleDropModule.address);
    console.log('✅ bundleDrop metadata:', await bundleDropModule.getMetadata());
  } catch (error) {
    console.log('failed to deploy bundleDrop module', error);
  }
})();
