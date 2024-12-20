import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-1/2 mt-11 p-4 bg-white rounded-lg border shadow-md border-gray-200">
        <h1 className="font-bold text-justify uppercase text-5xl mb-4 border-b-2 pb-2">
          Todo list
        </h1>

        <TodoAdd />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
