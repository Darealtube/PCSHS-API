import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { unwrapResolverError } from "@apollo/server/errors";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./apollo/resolvers";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  formatError: (formattedError, error) => {
    // Don't give the specific errors to the client.
    if (unwrapResolverError(error)) {
      return { message: "Internal server error" };
    }
    return formattedError;
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 3000 }, resolve)
);
console.log(`Server ready at http://localhost:4000/graphql`);
