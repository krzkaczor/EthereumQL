import { expect } from "chai";
import * as snapshot from 'snap-shot-it';

import { AbiParser } from "../AbiParser";
import { exampleAbi, exampleConstant } from "../__fixtures__/abi";

describe("AbiParser", () => {
  it("should work", () => {
    const abi = exampleConstant()

    const abiParser = new AbiParser();
    const parsedAbi = abiParser.parse(abi);

    snapshot("parsedAbi", parsedAbi);
  });
});
