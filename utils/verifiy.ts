import {run} from 'hardhat'

export default async (address: any, args: any) => {
  console.log('Verifying contract...');
  try {
    await run('verify:verify', {
      address: address,
      constructorArguments: args,
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified');
    } else {
      console.error(error);
    }
  }
};
