"use client";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const todos = [
    {
      name: "test",
      completed: false,
    },
  ];
  return (
    <>
      {todos.map((todo) => {
        return <TodoItem todo={todo} />;
      })}
    </>
  );
};
