import dotenv from 'dotenv';
import sdk from './1-initialize-sdk.js';

dotenv.config();

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === '') {
  console.log('🛑 Wallet address not found.');
}

if (!process.env.TOKEN_ADDRESS || process.env.TOKEN_ADDRESS === '') {
  console.log('🛑 Token address not found.');
}

const tokenModule = sdk.getTokenModule(process.env.TOKEN_ADDRESS);

(async () => {
  try {
    // Log the current roles.
    console.log('👀 Roles that exist right now:', await tokenModule.getAllRoleMembers());

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log('🎉 Roles after revoking ourselves', await tokenModule.getAllRoleMembers());
    console.log('✅ Successfully revoked our superpowers from the ERC-20 contract');
  } catch (error) {
    console.error('Failed to revoke ourselves from the DAO treasury', error);
  }
})();
