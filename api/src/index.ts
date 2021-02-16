import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";
import redisClient from "./config/redis";
import redirect from "./config/redirect";

import { ApolloServer, gql } from "apollo-server-express";

import resolvers from "./graphql/resolvers";
import fs from "fs";
import path from "path";

const typeDefs = gql(
  fs.readFileSync(path.resolve(__dirname, "./graphql/schema.graphql"), {
    encoding: "utf-8",
  })
);

const server = new ApolloServer({ typeDefs, resolvers });

const app: Application = express();
dotenv.config();
app.use(express.json());
app.use(cors());
connectDB();

server.applyMiddleware({ app, path: "/graphql" });
app.use("/:id", redirect);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}...`)
);
