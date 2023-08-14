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
                  //                 This gives a ts error ^^^^^^^^^^^^^^
                  // Type '{ id: string; name: string; completed: boolean; createdAt: Date; updatedAt: Date; }[]' is missing the following properties from type '{ status: 200; body: { id: string; name: string; completed: boolean; createdAt: Date; updatedAt: Date; }[]; headers: Headers; }': status, body, headers
                  setText("");
                  if (oldData) {
                    return [...oldData.body, data.body];
                  }
                  return [data.body];
                });
              },
            }
          );
        }}
      />
    </div>
  );
};
