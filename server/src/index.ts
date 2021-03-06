import { typeDefs, resolvers } from "./graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";

const app = express();
const port = 9000;
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/api" });

app.listen(port);

console.log(`[app] : http://localhost:${port}`);
