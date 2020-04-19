import gql from "graphql-tag";

export const GET_USER_QUERY = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
