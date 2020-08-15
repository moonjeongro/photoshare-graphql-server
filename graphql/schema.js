import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    type Mutation{
        postPhoto(input: postPhotoInput!): Photo!
    }

    enum PhotoCategory {
        SELFIE
        PORTRATE
        ACTION
        LANDSCAPE
        GRAPHIC
    }

    scalar DateTime

    type Photo {
        id: ID!
        url: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
        taggedUsers: [User]
        created: DateTime!
    }

    type User {
        githubId: ID!
        name: String
        avater: String
        postedPhotos: [Photo]
        taggedPhotos: [Photo]
    }

    input postPhotoInput {
        category: PhotoCategory=PORTRATE
        description: String
    }
`;
