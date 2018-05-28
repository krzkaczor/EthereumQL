import { IContract, IConstantDeclaration } from "../../parser/EvmTypes";
import { exampleConstant } from "../../parser/__fixtures__/abi";

export const exampleSimpleContract = (name: string): IContract => {
  return {
    name,
    parsedAbi: [
      {
        type: "ConstantDeclaration",
        name: "SOME_VALUE",
        output: "bool",
      },
    ],
    rawAbi: exampleConstant,
  };
};
