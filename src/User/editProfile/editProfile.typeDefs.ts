import { gql } from "apollo-server";
import { GraphQLUpload } from 'graphql-upload';

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): EditProfileResult!
  }
`;