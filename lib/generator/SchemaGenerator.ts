import { IContract, IAbiDeclaration, IPrimitiveType } from "../parser/EvmTypes";

export class SchemaGenerator {
  /**
   * use this to generate complete graphql schema ie. when you dont need to add any query types
   */
  public generateCompleteSchema(contract: IContract): string {
    return `
    ${this.generateTypes(contract)}
      
    type Query {
      ${this.generateRootQueryBody(contract)}
    }
    `;
  }

  public generateTypes(contract: IContract): string {
    return `
    type ${contract.name} {
      address: String!
      ${contract.abi.map(generateSchemaForDeclaration).join("\n")}
    }
    `;
  }

  public generateRootQueryBody(contract: IContract): string {
    return `
      ${lowerCaseFirstLetter(contract.name)}(address: String!): ${contract.name}!
    `;
  }
}

function generateSchemaForDeclaration(declaration: IAbiDeclaration): string {
  switch (declaration.type) {
    case "ConstantDeclaration": {
      return `${declaration.name}: ${generateGraphqlTypeForEvmType(declaration.output)}`;
    }
  }
}

function generateGraphqlTypeForEvmType(evmType: IPrimitiveType): string {
  switch (evmType) {
    case "bool":
      return "Boolean";
    case "uint256":
      return "Int";
    default:
      throw new Error("Unrecognized type!");
  }
}

function lowerCaseFirstLetter(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
