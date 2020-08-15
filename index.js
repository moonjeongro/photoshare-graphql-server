import {ApolloServer, gql} from 'apollo-server';
import {typeDefs} from './graphql/schema';
import {resolvers} from './graphql/resolvers'

const server = new ApolloServer({ 
    typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});