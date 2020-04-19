import React from "react";

import { useForm } from "react-hook-form";

import { useMutation } from "@apollo/react-hooks";

import { LOGIN_MUTATION } from "../queries/login";
import { GET_USER_QUERY } from "../queries/me";

import { Wrapper, Form, Input, Button, Card, Box } from "bushido-strap";

import Router from "next/router";

export default function Login() {
  const { handleSubmit, register } = useForm();
  const [login] = useMutation(LOGIN_MUTATION);

  const onSubmit = async ({ username }: Record<string, any>) => {
    console.log("username", username);
    const gqlData = await login({
      variables: {
        username,
      },
      refetchQueries: [{ query: GET_USER_QUERY }],
    });
    console.log("GQL Data", gqlData);
    Router.push("/");
  };

  return (
    <Wrapper>
      <Card>
        <Card invert>
          <Form onSubmit={handleSubmit(onSubmit)} m="2rem">
            <Input
              name="username"
              type="text"
              placeholder="Username"
              ref={register}
            />
            {/* <Input type="password" placeholder="Password" /> */}
            <Box h="2rem" />
            <Button type="submit">Login</Button>
          </Form>
        </Card>
      </Card>
    </Wrapper>
  );
}
