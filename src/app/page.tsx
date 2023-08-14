import { CreateTodo } from "@/components/CreateTodo";
import classes from "./page.module.css";
import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <main className={classes.main}>
      <h1 className={classes.header}>Your todos</h1>
      <CreateTodo />
      <TodoList />
    </main>
  );
}
