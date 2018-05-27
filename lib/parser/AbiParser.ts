import { injectable } from "inversify";
import { IAbiDeclaration } from "./EvmTypes";

@injectable()
export class AbiParser {
  public parse(abiJson: any) {
    return abiJson.map((piece: any) => this.parsePiece(piece));
  }

  private parsePiece(abiPiece: any): IAbiDeclaration {
    if (abiPiece.constant && abiPiece.inputs.length === 0 && abiPiece.outputs.length === 1) {
      return {
        type: "ConstantDeclaration",
        name: abiPiece.name,
        output: abiPiece.outputs[0].type,
      };
    }

    throw new Error("Unsupported piece");
  }
}
