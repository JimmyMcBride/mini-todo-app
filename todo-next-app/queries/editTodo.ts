import gql from "graphql-tag";

export const EDIT_TODO = gql`
  mutation EditTodo($data: EditTodoInput!) {
    editTodo(data: $data) {
      id
      name
      description
      complete
    }
  }
`;
