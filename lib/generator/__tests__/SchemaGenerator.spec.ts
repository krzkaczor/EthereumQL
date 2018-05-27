import { exampleSimpleContract } from "../__fixtures__/contracts";
import { SchemaGenerator } from "../SchemaGenerator";
import * as snapshot from "snap-shot-it";

describe("SchemaGenerator", () => {
  it("should generate graphql schema", () => {
    const exampleContract = exampleSimpleContract("DummyContract");

    const schemaGenerator = new SchemaGenerator();
    const schema = schemaGenerator.generateTypes(exampleContract);

    snapshot("schema", schema);
  });

  it("should generate graphql root query types", () => {
    const exampleContract = exampleSimpleContract("DummyContract");

    const schemaGenerator = new SchemaGenerator();
    const schema = schemaGenerator.generateRootQueryBody(exampleContract);

    snapshot("root-query-types", schema);
  });

  it("should generate complete graphql schema", () => {
    const exampleContract = exampleSimpleContract("DummyContract");

    const schemaGenerator = new SchemaGenerator();
    const schema = schemaGenerator.generateCompleteSchema(exampleContract);

    snapshot("complete-schema", schema);
  });
});
