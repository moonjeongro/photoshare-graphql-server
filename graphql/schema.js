import {gql} from 'apollo-server';

export const typeDefs = gql`

  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation{
    postPhoto(name: String! description: String): Photo!
  }
`;