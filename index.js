import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';

import {typeDefs} from './graphql/schema';
import {resolvers} from './graphql/resolvers'

import {MongoClient} from 'mongodb';



const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    console.log("Connected successfully to server");
    client.close();
});

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({app});

app.get('/', (req, res)=> res.end('Welcome to photoshare API'));

app.get('/playground', expressPlayground({ endpoint: '/graphql'}));

// Connection URL
const url = 'mongodb://localhost:27017';



// The `listen` method launches a web server.
app.listen({ port: 4000 }, () =>
    console.log(`🚀GraphQL server running @ http://localhost:4000${server.graphqlPath}`)
)