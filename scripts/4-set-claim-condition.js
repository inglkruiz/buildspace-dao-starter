import dotenv from 'dotenv';
import sdk from './1-initialize-sdk.js';

dotenv.config();

if (!process.env.BUNDLEDROP_ADDRESS || process.env.BUNDLEDROP_ADDRESS === '') {
  console.log('🛑 Bundledrop address not found.');
}

const bundleDrop = sdk.getBundleDropModule(process.env.BUNDLEDROP_ADDRESS);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    // Specify conditions.
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1,
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log('✅ Sucessfully set claim condition!');
  } catch (error) {
    console.error('Failed to set claim condition', error);
  }
})();
