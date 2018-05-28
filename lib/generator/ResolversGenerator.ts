import * as Web3 from "web3";
import { groupBy, mapValues } from "lodash";

import { IContract, IAbiDeclaration } from "../parser/EvmTypes";
import { lowerCaseFirstLetter } from "./SchemaGenerator";

export class ResolversGenerator {
  constructor(private readonly web3: Web3) {}

  public generateResolvers(contract: IContract): any {
    // @todo type properly
    return {
      [contract.name]: this.generateMap(contract),
      Query: {
        [lowerCaseFirstLetter(contract.name)]: (_root: any, args: any, _ctx: any) => {
          const address = args.address as string | undefined;
          if (!address) {
            throw new Error("Missing address!");
          }

          const __contract = this.web3.eth.contract(contract.rawAbi).at(address);
          return {
            __contract,
          };
        },
      },
    };
  }

  private generateMap(contract: IContract) {
    const byName = groupBy(contract.parsedAbi, "name");

    return mapValues(byName, decl => this.generateResolverForDeclaration(decl, contract));
  }

  private generateResolverForDeclaration(declarations: IAbiDeclaration[], contract: IContract) {
    if (declarations.length > 1) {
      throw new Error("Overloads are not supported now");
    }

    const declaration = declarations[0];
    return async (root: any, _args: any, _ctx: any) => {
      const contractWrapper = root.__contract;

      const res = await promisify(contractWrapper[declaration.name], []);

      return res;
    };
  }
}

export function promisify(func: any, args: any): Promise<any> {
  return new Promise((res, rej) => {
    func(...args, (err: any, data: any) => {
      if (err) return rej(err);
      return res(data);
    });
  });
}
