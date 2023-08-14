"use client";

import { client } from "@/lib/queryClient";
import classes from "./CreateTodo.module.css";
import { useState } from "react";
import { useTsRestQueryClient } from "@ts-rest/react-query";

export const CreateTodo = () => {
  const api = useTsRestQueryClient(client);

  const mutation = api.todos.createTodo.useMutation();
  const [text, setText] = useState("");

  return (
    <div className={classes.container}>
      <input
        type="text"
        autoComplete="off"
        placeholder="Add New Task"
        className={classes.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="submit"
        value=""
        className={classes.button}
        title="Add Task"
        onClick={(e) => {
          e.preventDefault();
          mutation.mutate(
            {
              body: {
                name: text,
              },
            },
            {
              onSuccess: (data) => {
                api.todos.getTodos.setQueryData(["todos"], (oldData) => {
                  setText("");
                  if (!oldData) return undefined;
                  return { ...oldData, body: [...oldData.body, data.body] };
                });
              },
            }
          );
        }}
      />
    </div>
  );
};
