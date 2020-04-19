import gql from "graphql-tag";

export const ADD_TODO = gql`
  mutation AddTodo($data: AddTodoInput!) {
    addTodo(data: $data) {
      id
      name
      description
      complete
    }
  }
`;
