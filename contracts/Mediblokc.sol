// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import 'hardhat/console.sol';
  
contract Mediblokc {
  struct Record {
    string doctorId;
    string recordId;
  }

  mapping (string => Record[]) private patientRecords;
  mapping (string => string[]) private patientRecordIds;

  event Transaction(string indexed doctorId, string indexed patientId, string indexed recordId);
  event ErrorEvent(string mess, string indexed doctorId, string indexed patientId, string indexed recordId);

  function saveTransaction(string memory _doctorId, string memory _patientId, string memory _recordId) external {
    if (bytes(_patientId).length == 0 || bytes(_recordId).length == 0 || bytes(_doctorId).length == 0) {
        emit ErrorEvent("%s %s %s invalid id", _doctorId, _patientId, _recordId);
        revert("Mediblokc__InvalidId");
    }
    
    if (keccak256(bytes(_doctorId)) == keccak256(bytes(_patientId))) {
        emit ErrorEvent("%s %s %s invalid address", _doctorId, _patientId, _recordId);
        revert("Mediblokc__InvalidAddress");
    }
    
    Record memory record = Record(_doctorId, _recordId);
    patientRecords[_patientId].push(record);
    patientRecordIds[_patientId].push(_recordId);
    emit Transaction(_doctorId, _patientId, _recordId);
}

  function viewRecords(string memory _patientId) external view returns (string[] memory) {
    return patientRecordIds[_patientId]; 
  }
}