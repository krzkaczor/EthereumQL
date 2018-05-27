exports['schema 1'] = `

    type DummyContract {
      address: String!
      SOME_VALUE: Boolean
    }
    
`

exports['root-query-types 1'] = `

      dummyContract(address: String!): DummyContract!
    
`

exports['complete-schema 1'] = `

    
    type DummyContract {
      address: String!
      SOME_VALUE: Boolean
    }
    
      
    type Query {
      
      dummyContract(address: String!): DummyContract!
    
    }
    
`
