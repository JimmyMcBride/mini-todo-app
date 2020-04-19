import React from "react";

import { useMutation } from "react-apollo";
import { EDIT_TODO } from "../../../queries/editTodo";

import { Card, Text, Button, Flex, theme } from "bushido-strap";

import { Props } from "./index";

export default function TodoList({ todos }: Props) {
  const [editTodo] = useMutation(EDIT_TODO);
  return (
    <>
      {todos?.map((todo) => {
        return (
          <Card invert key={todo.id} stretch>
            <Text lf bold color={!todo.complete ? theme.gray1 : theme.red5}>
              {todo.name}
            </Text>
            <Text>{todo.description}</Text>
            <Flex jcBetween stretch>
              <Button orange>Edit</Button>
              <Button
                violet
                onClick={async (e: any) => {
                  e.preventDefault();
                  try {
                    await editTodo({
                      variables: {
                        data: {
                          id: todo.id,
                          complete: !todo.complete,
                        },
                      },
                    });
                  } catch (err) {
                    console.log("ERROR MESSAGE", err.networkError);
                    console.log("ERR KEYS:", Object.keys(err));
                  }
                  console.log("todo complete status", !todo.complete);
                }}
              >
                {todo?.complete ? "Mark Not Complete" : "Mark Complete"}
              </Button>
            </Flex>
          </Card>
        );
      })}
    </>
  );
}
