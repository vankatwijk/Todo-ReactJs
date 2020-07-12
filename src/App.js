import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/dist/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos,setTodos] = useState([])
  const todoNameRef = useRef()

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === '') return

    setTodos(prevTodos => {
      return [...prevTodos,{id:uuidv4(),name:name,complete:false}]
    })
    todoNameRef.current.value = null
  }

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  useEffect(() =>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])// similar to created in vue // will take effect when the page is created

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) // similar to a deep watcher in vue / on everychange it stores in the localstorage

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
