import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoList, type todoListProps } from './TodoList';
import { CompletedTodos } from './CompletedTodo';

function App() {
  const [todo, setTodo] = useState([
    {id: 1, title: "Make bryce pregnant.", description: "Fuck him silly", due: "3/15/2023", completed:false}
  ]);

  const handleDeleteTodo = (e: React.MouseEvent, item: todoListProps["todo"][0]) => {
    let newlist = [...todo];
    setTodo(newlist.filter((task) => {
      return (task.id !== item.id)
    }))
  }

  const handleToggleComplete = (e: React.MouseEvent, item: todoListProps["todo"][0]) => {
    item.completed = !item.completed;
    let newlist = [...todo];
    
    let mod = newlist.map((task) => {
      return (task.id === item.id)
        ? item 
        : task
    })

    console.log(mod);

    setTodo(mod);
  }

  return (
    <>
      <h1>Todo:</h1>
      <TodoList 
        todo={todo}
        deleteTodo={handleDeleteTodo}
        toggleCompleted={handleToggleComplete}
      />

      <h1>Completed:</h1>
      <CompletedTodos
        todo={todo}
        deleteTodo={handleDeleteTodo}
        toggleCompleted={handleToggleComplete}
      />
    </>
  );
}

export default App
