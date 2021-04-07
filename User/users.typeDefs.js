import { gql } from "apollo-server";

export default gql`
  type User {
    id:        String!
    firstName: String!
    lastName:  String
    username:  String!
    email:     String!
    password:  String!
    createdAt: String!
    updatedAt: String!
  }

  type LoginResult {
      ok: Boolean!
      error: String
      token: String
  }

  type EditProfileInput {
    ok: Boolean! 
    error:String
  }
  type Mutation {
      createAccount(
        firstName: String!
        lastName:  String
        username:  String!
        email:     String!
        password: String!
      ): User

      login(username:String!, password:String!): LoginResult!

      editProfile(
        firstName: String
        lastName:  String
        username:  String
        email:     String
        password:  String
      )
  }

  type Query {
      seeProfile(username: String): User
  }
`;
