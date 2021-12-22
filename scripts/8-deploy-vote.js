import dotenv from 'dotenv';
import sdk from './1-initialize-sdk.js';

dotenv.config();

if (!process.env.APP_ADDRESS || process.env.APP_ADDRESS === '') {
  console.log('🛑 App address not found.');
}

if (!process.env.TOKEN_ADDRESS || process.env.TOKEN_ADDRESS === '') {
  console.log('🛑 Token address not found.');
}

// Grab the app module address.
const appModule = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      // Give your governance contract a name.
      name: "Nonsense DAO's Epic Proposals",

      // This is the location of our governance token, our ERC-20 contract!
      votingTokenAddress: process.env.TOKEN_ADDRESS,

      // After a proposal is created, when can members start voting?
      // For now, we set this to immediately.
      proposalStartWaitTimeInSeconds: 0,

      // How long do members have to vote on a proposal when it's created?
      // Here, we set it to 24 hours (86400 seconds)
      proposalVotingTimeInSeconds: 24 * 60 * 60,

      // Will explain more below.
      votingQuorumFraction: 0,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      // I set it to 0. Meaning no tokens are required for a user to be allowed to
      // create a proposal.
      minimumNumberOfTokensNeededToPropose: '0',
    });

    console.log('✅ Successfully deployed vote module, address:', voteModule.address);
  } catch (err) {
    console.log('Failed to deploy vote module', err);
  }
})();
