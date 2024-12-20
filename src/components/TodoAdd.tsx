import { useState } from "react";
import { useAddTodoMutation } from "../services/todoApi";
import { v4 as uuidv4 } from "uuid";

export default function TodoAdd() {
  const [addTodo, { isLoading, error }] = useAddTodoMutation();

  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      return;
    }
    await addTodo({ id: uuidv4(), title, completed: false });
    setTitle("");
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        {error && (
          <p className="w-full p-2 text-white bg-red-500">Erreur d'ajout</p>
        )}
        <div className="mb-2 border-2 flex justify-between gap-2 p-3">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a todo"
            className="w-full p-2 outline-none border-2 border-gray-400 rounded-md text-xl"
          />
          <button
            disabled={isLoading}
            type="submit"
            className="p-2 bg-indigo-500 text-white rounded-md"
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
