import { contract, todosContract } from "@/shared/contract";
import { createNextRoute, createNextRouter } from "@ts-rest/next";
import prisma from "@/lib/prisma";

const todosRouter = createNextRoute(todosContract, {
  createTodo: async (args) => {
    const newPost = await prisma.todo.create({
      data: { name: args.body.name },
    });

    return {
      status: 201,
      body: newPost,
    };
  },
  getTodo: async (args) => {
    const todo = await prisma.todo.findFirst({
      where: { id: args.params.id },
    });
    if (!todo) {
      return {
        status: 404,
        body: {
          message: "Todo not found",
        },
      };
    }
    return {
      status: 200,
      body: todo,
    };
  },
  getTodos: async () => {
    const todos = await prisma.todo.findMany();
    return {
      status: 200,
      body: todos,
    };
  },
  deleteTodo: async (args) => {
    await prisma.todo.delete({
      where: { id: args.params.id },
    });
    return {
      status: 200,
      body: null,
    };
  },
  toggleTodo: async (args) => {
    const foundTodo = await prisma.todo.findFirst({
      where: { id: args.params.id },
    });
    if (!foundTodo) {
      return {
        status: 404,
        body: null,
      };
    }
    const updatedTodo = await prisma.todo.update({
      where: { id: args.params.id },
      data: { completed: !foundTodo.completed },
    });
    return {
      status: 200,
      body: updatedTodo,
    };
  },
});

const router = createNextRoute(contract, {
  todos: todosRouter,
});

export default createNextRouter(contract, router);
