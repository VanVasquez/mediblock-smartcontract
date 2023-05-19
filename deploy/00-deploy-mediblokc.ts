import {network} from 'hardhat'
import { developmentChains } from '../helper.hardhat.config';
import verify from '../utils/verifiy'
let MediblokcContractAddress

export default async ({getNamedAccounts, deployments}: any) => {
  const {log, deploy} = deployments;
  const {deployer} = await getNamedAccounts();

  log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
  log('deploying contracts...');
  const MediblokcContract = await deploy('Mediblokc', {
    from: deployer,
    log: true,
    waitConfirmations: 1,
  });

  MediblokcContractAddress = MediblokcContract.address;
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log('VERIFRING CONTRACT');
    
    await verify(MediblokcContract.address, []);
  }
  log('=================================================================================');
}

exports.tags = ['all', 'paymentcontracts'];

exports.MediblokcContractAddress = MediblokcContractAddress;
