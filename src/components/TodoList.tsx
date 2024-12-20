import { useGetTodosQuery, useUpdateTodoMutation } from "../services/todoApi";
import { BsFillTrashFill } from "react-icons/bs";
import { useRemoveTodoMutation } from "../services/todoApi";
import LoadingUpdate from "./LoadingUpdate";

export default function TodoList() {
  const { data: todos, error, isLoading } = useGetTodosQuery(null);
  const [removeTodo, { isLoading: deleting, error: deleteError }] =
    useRemoveTodoMutation();

  const [updateTodo, { isLoading: updating, error: updateError }] =
    useUpdateTodoMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return (
      <div className="text-2xl text-center text-red-600 p-2">
        Error: can't reach server
      </div>
    );
  }

  if (deleteError) {
    console.log(deleteError);
    return (
      <div className="text-2xl text-center text-red-600 p-2">
        Error: can't delete todo
      </div>
    );
  }

  if (updateError) {
    console.log(updateError);
    return (
      <div className="text-2xl text-center text-red-600 p-2">
        Error: can't delete todo
      </div>
    );
  }

  console.log(todos);

  if (!todos) {
    return <div>No todos</div>;
  }

  const handleDeleteTodo = async (id: string) => {
    await removeTodo({ id });
  };

  // change todo to completed or not
  const handleUpdateTodo = async (todo: any) => {
    await updateTodo({ ...todo, completed: !todo.completed });
  };

  if (deleting || updating) {
    return <LoadingUpdate />;
  }

  return (
    <div>
      <div>
        <ul className="list-none flex flex-col gap-2 divide-y-2 text-2xl">
          {todos.map((todo: any) => (
            <li key={todo.id} className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleUpdateTodo(todo)}
                  className="h-6 w-6"
                />
                <span>{todo.title}</span>
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)}>
                <BsFillTrashFill className="text-4xl text-red-600" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
