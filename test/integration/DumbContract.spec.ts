import { deployContract, readContractAbi } from "./integrationTestUtils";
import { SchemaGenerator } from "../../lib/generator/SchemaGenerator";
import { IContract } from "../../lib/parser/EvmTypes";

import { makeExecutableSchema, mockServer } from "graphql-tools";
import { ResolversGenerator } from "../../lib/generator/ResolversGenerator";
import { AbiParser } from "../../lib/parser/AbiParser";

describe("DumbContract integration", () => {
  let contractAddress: string;

  beforeEach(async () => {
    contractAddress = (await deployContract("DumbContract")).address;
  });

  it("should work", async () => {
    const parser = new AbiParser();
    const contractAbi = readContractAbi("DumbContract");
    const contract: IContract = {
      name: "DumbContract",
      abi: parser.parse(contractAbi),
    };

    const schemaGenerator = new SchemaGenerator();
    const resolversGenerator = new ResolversGenerator();

    const schemaString = schemaGenerator.generateCompleteSchema(contract);
    const resolvers = resolversGenerator.generateResolvers(contract);

    const schema = makeExecutableSchema({
      typeDefs: schemaString,
      resolvers: resolvers,
    });

    const server = mockServer(schema, {}, true);
    const response = await server.query(`
    query {
      dumbContract(address: "0xABC") {
        SOME_BOOLEAN_VALUE
        SOME_NUMERIC_VALUE
      }
    }`);

  });
});
