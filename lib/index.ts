import "reflect-metadata";
import * as Web3 from "web3";

import { IContract } from "./parser/EvmTypes";
import { AbiParser } from "./parser/AbiParser";
import { SchemaGenerator } from "./generator/SchemaGenerator";
import { ResolversGenerator } from "./generator/ResolversGenerator";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";

export function generateExecutableSchema(contractName: string, abi: any, web3: Web3): GraphQLSchema {
  const parser = new AbiParser();
  const schemaGenerator = new SchemaGenerator();
  const resolverGenerator = new ResolversGenerator(web3);

  const contract: IContract = {
    name: contractName,
    parsedAbi: parser.parse(abi),
    rawAbi: abi,
  };

  const schema = makeExecutableSchema({
    typeDefs: schemaGenerator.generateCompleteSchema(contract),
    resolvers: resolverGenerator.generateResolvers(contract),
  });

  return schema;
}
