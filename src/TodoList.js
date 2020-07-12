import React from 'react'
import Todo from './Todo'


export default function TodoList({todos}) {
    return (
        todos.map(todo =>{
            return <Todo key={todo} todo={todo} />
        })
    )
}