import { ethers, network } from "hardhat";
import { developmentChains } from "../helper.hardhat.config";
import { Contract } from "ethers";
import {expect} from 'chai';

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('Mediblokc', () => {
    let mediblokcContract: Contract;
    let patientId = 'pat1',
        doctorId = 'doc2', 
        recordId = 'rec3';

    beforeEach(async () => {
      const MediblokcContract = await ethers.getContractFactory("Mediblokc");
      mediblokcContract = await MediblokcContract.deploy();
      await mediblokcContract.deployed();
    });

    it("should save transaction", async () => {
      await mediblokcContract.saveTransaction(doctorId, patientId, recordId);
      const patientRecordIds = await mediblokcContract.viewRecords(patientId); 
      expect(patientRecordIds).to.include(recordId);
    }); 

    it('should not allow same id', async () => {
      await expect(
        mediblokcContract.saveTransaction(doctorId, doctorId, recordId)
      ).to.be.revertedWith('Mediblokc__InvalidAddress');
    });
    
    it('should not allow null id', async () => {
      await expect(
        mediblokcContract.saveTransaction('', patientId, recordId)
      ).to.be.revertedWith('Mediblokc__InvalidId');
    });

   it('should emit an event',async () => {
      const transactionPromise = mediblokcContract.saveTransaction(doctorId, patientId, recordId);
      
      await expect(transactionPromise)
      .to.emit(mediblokcContract, 'Transaction')
      .withArgs(doctorId, patientId, recordId);
   })
  })