"use client";
import { client } from "@/lib/queryClient";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { data } = client.todos.getTodos.useQuery(["todos"]);
  if (!data) return <>Loading...</>;
  if (data.status !== 200) return <>An error occurred</>;
  return (
    <>
      {data.body.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </>
  );
};
