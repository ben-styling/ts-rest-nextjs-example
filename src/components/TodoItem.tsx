"use client";

import { ClientInferResponseBody } from "@ts-rest/core";
import classes from "./TodoItem.module.css";
import { todosContract } from "@/shared/contract";
import { useTsRestQueryClient } from "@ts-rest/react-query";
import { client } from "@/lib/queryClient";

type Todo = ClientInferResponseBody<typeof todosContract.getTodo, 200>;

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const api = useTsRestQueryClient(client);
  const deleteMutation = api.todos.deleteTodo.useMutation();
  const toggleMutation = api.todos.toggleTodo.useMutation();

  return (
    <li className={classes.container}>
      <label className={classes.label}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => {
            toggleMutation.mutate(
              { params: { id: todo.id } },
              {
                onSuccess: (data) => {
                  api.todos.getTodos.setQueryData(["todos"], (oldData) => {
                    if (!oldData) return [];
                    return {
                      ...oldData,
                      body: oldData.body.map((t) =>
                        t.id === todo.id ? data.body : t
                      ),
                    };
                  });
                },
              }
            );
          }}
        />
        <span>{todo.name}</span>
      </label>
      <button
        aria-label="delete"
        className={classes.button}
        title="Delete Task"
        onClick={() => {
          deleteMutation.mutate(
            { params: { id: todo.id } },
            {
              onSuccess: () => {
                api.todos.getTodos.setQueryData(["todos"], (oldData) => {
                  //                 This gives a ts error ^^^^^^^^^^^^^^
                  // Type '{ id: string; name: string; completed: boolean; createdAt: Date; updatedAt: Date; }[]' is missing the following properties from type '{ status: 200; body: { id: string; name: string; completed: boolean; createdAt: Date; updatedAt: Date; }[]; headers: Headers; }': status, body, headers
                  if (!oldData) return [];
                  return oldData.body.filter((t) => t.id === todo.id);
                });
              },
            }
          );
        }}
      ></button>
    </li>
  );
};
