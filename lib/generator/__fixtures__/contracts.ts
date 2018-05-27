import { IContract } from "../../parser/EvmTypes";

export const exampleSimpleContract = (name: string): IContract => {
  return {
    name,
    abi: [
      {
        type: "ConstantDeclaration",
        name: "SOME_VALUE",
        output: "bool",
      },
    ],
  };
};
