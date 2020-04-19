import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!) {
    login(username: $username) {
      status
      message
    }
  }
`;
