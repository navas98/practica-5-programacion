import { gql } from "graphql_tag";

export const typeDefs = gql`
  type User{
    id:ID!
    username:String!
    date:String!
    idioma:String!
    token:String

  }
 
  type Query {
   Me (token:String!):User!
  }

  type Mutation {
   login (username:String!,password:String!):String! 
   singup(username:String!,password:String!):User!
  }
`;
