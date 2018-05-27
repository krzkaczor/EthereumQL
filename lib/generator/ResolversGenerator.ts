import { IContract, IAbiDeclaration } from "../parser/EvmTypes";
import { groupBy, mapValues } from 'lodash';

export class ResolversGenerator {
  public generateResolvers(contract: IContract) {
    return {
      [contract.name]: generateMap(contract.abi);
    }
  }
}

function generateMap(abi: ReadonlyArray<IAbiDeclaration>) {
  const byName = groupBy(abi, 'name')

  return mapValues(byName, generateResolverForDeclaration)
}

function generateResolverForDeclaration(declarations: IAbiDeclaration[]) {
  if (declarations.length > 1) {
    throw new Error("Overloads are not supported now");
  }

  const declaration = declarations[0];
  return (_root: any, _args: any, _ctx: any) => {
    root[contract][declaration.]
  }
}