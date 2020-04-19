import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { useMutation } from "@apollo/react-hooks";

import {
  Card,
  // Text,
  Button,
  Form,
  Flex,
  Input,
  TextArea,
  theme,
} from "bushido-strap";

import { ADD_TODO } from "../../../queries/addTodo";
import { MY_TODOS_QUERY } from "../../../queries/myTodos";

import TodoList from "./TodoList";

export interface Todo {
  id: number;
  name: string;
  description: string;
  complete: boolean;
}
export interface Props {
  todos: Array<Todo>;
}

export default function Todos({ todos }: Props) {
  const { handleSubmit, register } = useForm();
  const [create, setCreate] = useState<Boolean>(false);
  // const [complete, setComplete] = useState<Boolean>(false);

  const [addTodo] = useMutation(ADD_TODO);

  const onAddTodo = async (data: any) => {
    console.log(data);
    await addTodo({
      variables: {
        data: {
          name: data.name,
          description: data.description,
        },
      },
      refetchQueries: [{ query: MY_TODOS_QUERY }],
    });
    setCreate(!create);
    // location.reload();
  };
  console.log("todos:", todos);

  return (
    <Card bg={theme.whiteAlpha6}>
      <Button red>Clear Completed</Button>
      <TodoList todos={todos} />
      <Form onSubmit={handleSubmit(onAddTodo)} stretch>
        {create ? (
          <Flex drape stretch>
            <Input
              ref={register}
              stretch
              name="name"
              placeholder="Name of todo..."
            />
            <TextArea
              ref={register}
              stretch
              name="description"
              placeholder="Todos description..."
            />
          </Flex>
        ) : null}
        <Flex>
          <Button type="button" teal onClick={() => setCreate(!create)}>
            {create ? "Cancel" : "Add Todo"}
          </Button>
          {create ? (
            <Button green type="submit">
              Submit
            </Button>
          ) : null}
        </Flex>
      </Form>
    </Card>
  );
}
