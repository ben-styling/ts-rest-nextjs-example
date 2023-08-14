"use client";

import classes from "./CreateTodo.module.css";

export const CreateTodo = () => {
  return (
    <div className={classes.container}>
      <input
        type="text"
        autoComplete="off"
        placeholder="Add New Task"
        className={classes.input}
      />
      <input
        type="submit"
        value=""
        className={classes.button}
        title="Add Task"
      />
    </div>
  );
};
