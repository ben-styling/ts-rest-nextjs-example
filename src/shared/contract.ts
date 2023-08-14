import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ErrorSchema = z.object({
  message: z.string(),
});

const TodoSchema = z.object({
  id: z.string(),
  name: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const todosContract = c.router({
  createTodo: {
    method: "POST",
    path: "/todos",
    responses: {
      201: TodoSchema,
    },
    body: z.object({
      name: z.string(),
    }),
    summary: "Create a todo",
  },
  getTodo: {
    method: "GET",
    path: `/todos/:id`,
    responses: {
      200: TodoSchema,
      404: ErrorSchema,
    },
    summary: "Get a todo by id",
  },
  getTodos: {
    method: "GET",
    path: `/todos`,
    responses: {
      200: TodoSchema.array(),
    },
    summary: "Gets all todos",
  },
  deleteTodo: {
    method: "DELETE",
    path: `/todos/:id`,
    body: z.object({}),
    responses: {
      200: z.null(),
    },
    summary: "Delete a todo by id",
  },
  toggleTodo: {
    method: "PUT",
    path: `/todos/:id`,
    body: z.object({}),
    responses: {
      200: TodoSchema,
      404: z.null(),
    },
    summary: "Toggle a todo by id",
  },
});

export const contract = c.router(
  {
    todos: todosContract,
  },
  {
    pathPrefix: "/api",
  }
);
