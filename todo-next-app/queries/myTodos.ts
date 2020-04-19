import gql from "graphql-tag";

export const MY_TODOS_QUERY = gql`
  query MyTodos {
    myTodos {
      id
      name
      description
      complete
    }
  }
`;
