import "reflect-metadata";
import * as Web3 from "web3";

import { IContract } from "./parser/EvmTypes";
import { AbiParser } from "./parser/AbiParser";
import { SchemaGenerator } from "./generator/SchemaGenerator";
import { ResolversGenerator } from "./generator/ResolversGenerator";

export function generate(contractName: string, abi: any, web3: Web3) {
  const parser = new AbiParser();
  const schemaGenerator = new SchemaGenerator();
  const resolverGenerator = new ResolversGenerator(web3);

  const contract: IContract = {
    name: contractName,
    parsedAbi: parser.parse(abi),
    rawAbi: abi,
  };

  return {
    schema: schemaGenerator.generateCompleteSchema(contract),
    resolver: resolverGenerator.generateResolvers(contract),
  };
}
