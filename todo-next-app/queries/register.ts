import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!) {
    register(username: $username) {
      id
      username
    }
  }
`;
