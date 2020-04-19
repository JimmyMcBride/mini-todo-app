import React from "react";

import Layout from "../Layout";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { LOGOUT_MUTATION } from "../../queries/logout";

import { Button, Card, Text } from "bushido-strap";
import { GET_USER_QUERY } from "../../queries/me";
import { MY_TODOS_QUERY } from "../../queries/myTodos";
import Todos from "./Todos";

export default function Dashboard() {
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { data: meData } = useQuery(GET_USER_QUERY);
  const { data: myTodoData } = useQuery(MY_TODOS_QUERY);
  console.log("data", myTodoData);
  return (
    <Layout title="Home">
      <Card>
        <Card invert>
          <h1>Todo Next.js 👋</h1>
          <Text lf>Welcome, {meData?.me?.username}!</Text>
          <Todos todos={myTodoData?.myTodos} />
          <Button
            pink
            onClick={async () => {
              await logout({ refetchQueries: [{ query: GET_USER_QUERY }] });
              location.reload();
            }}
          >
            Logout
          </Button>
        </Card>
      </Card>
    </Layout>
  );
}
