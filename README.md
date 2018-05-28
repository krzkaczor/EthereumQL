# EthereumQL

Generate GraphQL api based on Ethereum smartcontracts ABI.

## Usage:

```typescript
import { generateExecutableSchema } from "ethereumql";

const schema = generateExecutableSchema("DumbContract", contractAbi, web3);
// returns graphql schema
```

## Status
WIP. You might find something interesting in test files. 
