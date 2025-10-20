import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoList, type todoListProps } from './TodoList';
import { CompletedTodos } from './CompletedTodo';

function App() {
  const [todo, setTodo] = useState([
    { id: 2, title: "Refill the moon’s coolant tank", description: "NASA said it’s running a bit hot again.", due: "2/03/2025", completed: true },
    { id: 3, title: "Teach the toaster empathy", description: "It keeps burning the bread out of spite.", due: "5/11/2025", completed: false },
    { id: 4, title: "Write apology letter to gravity", description: "For all the times I tried to defy it.", due: "7/29/2025", completed: false },
    { id: 5, title: "Find out where socks go", description: "Run controlled laundry experiments.", due: "9/10/2025", completed: true },
    { id: 6, title: "Host tea party for AI assistants", description: "Invite Alexa, Siri, and that one Roomba.", due: "10/03/2025", completed: false },
    { id: 7, title: "Reverse-engineer my cat’s meow", description: "Could be a secret code. Could be slander.", due: "10/18/2025", completed: false },
    { id: 8, title: "Build pillow fort empire", description: "Soft power is still power.", due: "11/02/2025", completed: false },
    { id: 9, title: "Invent non-stick glue", description: "Market slogan: 'It never sticks!' ...wait.", due: "12/15/2025", completed: false },
    { id: 10, title: "Bake a cake with quantum ingredients", description: "The cake both exists and doesn’t until tasted.", due: "1/07/2025", completed: true },
    { id: 11, title: "Translate whale song to karaoke format", description: "Oceanic Idol auditions begin soon.", due: "8/25/2025", completed: false }
  ]);

  const deleteTodo = (e: React.MouseEvent, id: number) => {
    let newlist = [...todo];
    setTodo(newlist.filter((task) => {
      return (task.id !== id)
    }))
  }

  const toggleCompleted = (e: React.MouseEvent, item: todoListProps["todo"][0]) => {
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
        deleteTodo={deleteTodo}
        toggleCompleted={toggleCompleted}
      />

      <h1>Completed:</h1>
      <CompletedTodos
        todo={todo}
        deleteTodo={deleteTodo}
        toggleCompleted={toggleCompleted}
      />
    </>
  );
}

export default App
