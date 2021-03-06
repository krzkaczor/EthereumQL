import { DeepReadonlyObject } from "../../typings/std";

export interface IConstantDeclaration {
  type: "ConstantDeclaration";
  name: string;
  output: IPrimitiveType;
}

export type IAbiDeclaration = IConstantDeclaration;

export type IBoolType = "bool" | "uint256";
export type IPrimitiveType = IBoolType;

export type IContract = DeepReadonlyObject<{
  name: string; // should be UpperCased
  parsedAbi: IAbiDeclaration[];
  rawAbi: any;
}>;
