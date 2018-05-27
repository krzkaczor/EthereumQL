import { IContract, IAbiDeclaration } from "../parser/EvmTypes";

export class SchemaGenerator {
  public generateTypes(contract: IContract): string {
    return `
    type ${contract.name} {
      ${contract.abi.map(generateSchemaForDeclaration).join("\n")}
    }
    `;
  }

  public generateRootQueryBody(contract: IContract): string {
    return `
      ${contract.name}: ${lowerCaseFirstLetter(contract.name)}
    `;
  }
}

function generateSchemaForDeclaration(declaration: IAbiDeclaration): string {
  switch (declaration.type) {
    case "ConstantDeclaration": {
      return `${declaration.name}: ${declaration.output}`;
    }
  }
}

function lowerCaseFirstLetter(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
