const {
  ApolloServer,
  gql,
  ApolloError,
  ValidationError,
} = require("apollo-server-express");
const express = require("express");
const session = require("express-session");
const connectRedis = require("connect-redis");
const db = require("./data/dbConfig");
const app = express();
const redis = require("./redis.js");
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT;

const RedisStore = connectRedis(session);

const sessionOptions = {
  store: new RedisStore({
    client: redis,
  }),
  name: "qid",
  secret: String(process.env.SECRET),
  resave: false,
  saveUninitialized: false,
};

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Todo {
    id: ID!
    name: String!
    description: String!
    complete: Boolean!
    user: User!
  }
  type LoginResponse {
    status: Boolean!
    message: String!
  }
  input AddTodoInput {
    name: String!
    description: String!
  }
  input EditTodoInput {
    id: ID!
    name: String
    description: String
    complete: Boolean
  }
  type Query {
    users: [User]!
    user(id: ID!): User!
    todos: [Todo]!
    myTodos: [Todo]!
    me: User
  }
  type Mutation {
    login(username: String!): LoginResponse!
    register(username: String!): User!
    logout: Boolean!
    addTodo(data: AddTodoInput!): Todo!
    editTodo(data: EditTodoInput!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;

const resolvers = {
  Todo: {
    async user(parent) {
      try {
        const user = await db("users").where({ id: parent.user_id }).first();
        return user || new ValidationError("User ID not found 🤷‍♂");
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },
  Query: {
    users(parent, args, ctx) {
      return db("users");
    },
    user(_, { id }) {
      return db("users").where({ id }).first();
    },
    todos() {
      return db("todos");
    },
    async me(_, __, ctx) {
      return await db("users").where({ id: ctx.req.session.userId }).first();
    },
    myTodos(_, __, ctx) {
      return db("todos").where({ user_id: ctx.req.session.userId });
    },
  },
  Mutation: {
    async login(_, { username }, ctx) {
      try {
        const user = await db("users").where({ username }).first();
        ctx.req.session.userId = user.id;
        // console.log(ctx.req.session);
        return {
          status: true,
          message: `Welcome, ${user.username}! 🔥`,
        };
      } catch (err) {
        return {
          status: false,
          message: err.message,
        };
      }
    },
    async register(_, data, ctx) {
      await db("users").insert(data);
      const user = await db("users").where({ username: data.username }).first();
      console.log("User:", user, data.username);
      ctx.req.session.userId = user.id;
      return user;
    },
    async logout(_, __, ctx) {
      return new Promise((res, rej) =>
        ctx.req.session.destroy((err) => {
          if (err) {
            console.log("Logout error: ", err);
            return rej(false);
          }

          ctx.res.clearCookie("qid");
          return res(true);
        })
      );
    },
    async addTodo(_, { data }, ctx) {
      const input = {
        ...data,
        user_id: ctx.req.session.userId,
      };
      await db("todos").insert(input);
      console.log(input);
      return db("todos").where({ name: data.name }).first();
    },
    async editTodo(_, { data }, ctx) {
      try {
        const input = {
          ...data,
          user_id: ctx.req.session.userId,
        };
        await db("todos").where({ id: data.id }).update(input);
        return await db("todos").where({ id: data.id }).first();
      } catch (err) {}
    },
    async deleteTodo(_, { id }) {
      return new Promise(async (res, rej) => {
        try {
          const deleteUser = await db("todos").where({ id }).del();
          if (!deleteUser) return rej(false);
          return res(true);
        } catch (err) {
          throw new ApolloError(err);
        }
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(session(sessionOptions));

server.applyMiddleware({ app, cors: false });

app.listen(port, () => {
  console.log(`💻 Server ready on http://localhost:${port}/graphql 🚀`);
});
