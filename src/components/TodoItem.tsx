"use client";

import { ClientInferResponseBody } from "@ts-rest/core";
import classes from "./TodoItem.module.css";
import { todosContract } from "@/shared/contract";

type Todo = ClientInferResponseBody<typeof todosContract.getTodo, 200>;

export const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <li className={classes.container}>
      <label className={classes.label}>
        <input type="checkbox" checked={todo.completed} />
        <span>{todo.name}</span>
      </label>
      <button
        aria-label="delete"
        className={classes.button}
        title="Delete Task"
      ></button>
    </li>
  );
};
