import "./style.css"
import { useState } from "react"
import { NewTodoForm } from "./NewToDoForm"
import { ToDoList } from "./ToDoList"
import { useEffect } from "react"

export default function App(){

  const [todos, setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return[]

    return JSON.parse(localValue)
  })

  useEffect(()=>{
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

 

  function toggleTodo(id, completed){
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if(todo.id===id){
          return { ...todo, completed} // Creating a brand new todo whilst changing the prorperty of completed on it
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function handleNewTodo(newItem) {
    setTodos([...todos, { id: Date.now(), title: newItem, completed: false }]);
  }
  
  return (
    <>
      <NewTodoForm onSubmit={handleNewTodo} />
      <h1 className="header">ToDo List</h1>
      <ToDoList todos = {todos} toggleTodo = {toggleTodo} deleteTodo = {deleteTodo}/>
      
    </>
  );
}