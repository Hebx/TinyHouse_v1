import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { typeDefs, resolvers } from "./graphql";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./databse";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  const listings = await db.listings.find({}).toArray();

  console.log(`[app] : http://localhost:${process.env.PORT}`);
  console.log(`[timestamp]`, new Date().toLocaleString());
  console.log(`[listings]`, listings);
};

mount(express());
