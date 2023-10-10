import { ApolloServer } from "@apollo/server";
import   'express-async-errors'
import {expressMiddleware} from '@apollo/server/express4'
import cors from 'cors'
import express from 'express'
import bodyParser from "body-parser";
import http from 'http'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import connection from "./src/connection/connection.js";
import resolvers from "./src/graphql/resolvers.js";
import typeDefs from './src/graphql/schema.js'

const app = express()
const httpServer = http.createServer(app);
const server = new ApolloServer({ typeDefs, resolvers,status400ForVariableCoercionErrors: true, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], introspection: process.env.NODE_ENV !== 'production' })
await server.start();
app.use('/graphql', bodyParser.json(), cors(), expressMiddleware(server))

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);

