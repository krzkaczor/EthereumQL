import { readFileSync } from "fs";
import { join } from "path";
import { ContractInstance } from "web3";

import { web3, accounts, GAS_LIMIT_STANDARD } from "./web3";
import { IContract, IAbiDeclaration } from "../../lib/parser/EvmTypes";

const contractsDirPath = join(__dirname, "../contract-artifacts");

export async function deployContract(contractName: string): Promise<ContractInstance> {
  return new Promise<ContractInstance>((resolve, reject) => {
    const abi = readContractAbi(contractName);

    const bin = readFileSync(join(contractsDirPath, contractName + ".bin"), "utf-8");
    const code = "0x" + bin;

    const contract = web3.eth.contract(abi);

    (contract as any).new({ from: accounts[0], data: code, gas: GAS_LIMIT_STANDARD }, (err: Error, contract: any) => {
      // this callback gets called multiple times
      // on a final call contract.address will be defined
      if (err) {
        reject(err);
      } else if (contract && contract.address) {
        resolve(contract);
      }
    });
  });
}

export function readContractAbi(contractName: string): any {
  return JSON.parse(readFileSync(join(contractsDirPath, contractName + ".abi"), "utf-8"));
}
