import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './context';
import { useEffect } from 'react';
import { TodoForm, TodoItem } from './components';

function App() {
  
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos,{id: Date.now(), ...todo}]);
  }
  const updatedTodo = (id, todo) => {
    setTodos((prevTodos) => prevTodos.map((prevTodo) => 
    (prevTodo.id === id ? 
      todo : 
      prevTodo)))
  }
  const deletedTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevtodo) => prevtodo.id!==id))
  }
 const toggleComplete =(id) => {
    setTodos((prevTodos) => prevTodos.map(
      (prevTodo) => prevTodo.id ===id 
      ? // if
       {...prevTodo, completed: !prevTodo.completed} 
       : // else
        prevTodo))
  }

  useEffect(() => {
   const todos =  JSON.parse(localStorage.getItem("todos"))

   if(todos && todos.length>0){
    setTodos(todos);
   }
  },[])

  useEffect(()=> {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])






  return (
    <TodoProvider value={{todos,addTodo,updatedTodo,deletedTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                    <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                      {todos.map((todo) => (
                        <div key={todo.id} className='w-full'>
                          <TodoItem todo={todo} />
                          </div>
                      ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
