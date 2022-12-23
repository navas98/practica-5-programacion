import { Server } from "std/http/server.ts";
import { GraphQLHTTP } from "gql";
import { makeExecutableSchema } from "graphql_tools";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./schema.ts";
import { User } from "./resolvers/User.ts";
import { startStandaloneServer } from "npm:@apollo/server@4.1/standalone";


const resolvers = {
  Query,
  Mutation,
  User

};

const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP<Request>({
          schema: makeExecutableSchema({ resolvers, typeDefs }),
          graphiql: true,
        })(req)
      : new Response("Not Found", { status: 404 });
  },
  port: 3000,
});


server.listenAndServe();
/*
try {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
    context: ({req}) => {
        const auth = req.headers.auth || ""
        return {
            auth: auth
        }
    }
  });	
} catch (error) {
	
}
*/

console.log(`Server running on: http://localhost:3000/graphql`);
