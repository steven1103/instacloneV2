import { gql } from "apollo-server";

export default gql`
  type Query {
    seeProfile(username: String!): User
  }
`;
import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};