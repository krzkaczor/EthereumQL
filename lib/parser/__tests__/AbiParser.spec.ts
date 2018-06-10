import * as snapshot from "snap-shot-it";

import { AbiParser } from "../AbiParser";
import { exampleConstant } from "../__fixtures__/abi";

describe("AbiParser", () => {
  it("should work", () => {
    const abi = exampleConstant();

    const abiParser = new AbiParser();
    const parsedAbi = abiParser.parse(abi);

    snapshot("parsedAbi", parsedAbi);
  });
});
