import React from 'react'
import ToDo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
 
  return (
    <>
      {todos.map(todo => {
        return (<ToDo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
      }).reduce((acc, cur) => [...acc, <hr/>, cur], [])}
    </>
  )
}

export default TodoList
