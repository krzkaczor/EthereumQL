import { deployContract, readContractAbi } from "./integrationTestUtils";
import { SchemaGenerator } from "../../lib/generator/SchemaGenerator";
import { IContract } from "../../lib/parser/EvmTypes";

import { makeExecutableSchema, mockServer } from "graphql-tools";
import { ResolversGenerator } from "../../lib/generator/ResolversGenerator";
import { AbiParser } from "../../lib/parser/AbiParser";
import { web3 } from "./web3";
import { expect } from "chai";
import { generateExecutableSchema } from "../../lib";

describe("DumbContract integration", () => {
  let contractAddress: string;

  beforeEach(async () => {
    contractAddress = (await deployContract("DumbContract")).address;
  });

  it("should work", async () => {
    const contractAbi = readContractAbi("DumbContract");
    const schema = generateExecutableSchema("DumbContract", contractAbi, web3);

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
