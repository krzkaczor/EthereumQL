import { deployContract, readContractAbi } from "./integrationTestUtils";
import { SchemaGenerator } from "../../lib/generator/SchemaGenerator";
import { IContract } from "../../lib/parser/EvmTypes";

import { makeExecutableSchema, mockServer } from "graphql-tools";
import { ResolversGenerator } from "../../lib/generator/ResolversGenerator";
import { AbiParser } from "../../lib/parser/AbiParser";
import { web3 } from "./web3";
import { expect } from "chai";

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
      parsedAbi: parser.parse(contractAbi),
      rawAbi: contractAbi,
    };

    const schemaGenerator = new SchemaGenerator();
    const resolversGenerator = new ResolversGenerator(web3);

    const schemaString = schemaGenerator.generateCompleteSchema(contract);
    const resolvers = resolversGenerator.generateResolvers(contract);

    const schema = makeExecutableSchema({
      typeDefs: schemaString,
      resolvers: resolvers,
    });

    const server = mockServer(schema, {}, true);
    const response = await server.query(`
    query {
      dumbContract(address: "${contractAddress}") {
        SOME_BOOLEAN_VALUE
        SOME_NUMERIC_VALUE
      }
    }`);

    expect(response).to.be.deep.eq({
      data: {
        dumbContract: {
          SOME_BOOLEAN_VALUE: true,
          SOME_NUMERIC_VALUE: 42,
        },
      },
    });
  });
});
