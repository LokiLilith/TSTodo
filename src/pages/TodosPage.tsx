import React, { useState, useEffect } from 'react'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { ITodo } from '../interfaces'
import axios from "axios";

declare var confirm: (question: string) => boolean

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const getTodos =async () => {
  const res = await axios.get<ITodo[]>("https://63395ed1937ea77bfdc9ecd2.mockapi.io/todos");
  setTodos(res.data)
  }
/* 
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
    setTodos(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]) */
  useEffect(() =>{
    getTodos()
  },[])

  const addHandler = async (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false
    }
    /* setTodos([newTodo, ...todos]) */
    await axios.post("https://63395ed1937ea77bfdc9ecd2.mockapi.io/todos", newTodo);
    getTodos()
  }

  const toggleHandler = (id: number):void => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  const removeHandler = async (id: number) => {
    const shoudRemove = confirm('sei sicuro che vuoi cancellare questo elemento?')
    if (shoudRemove) {
      await axios.delete(`https://63395ed1937ea77bfdc9ecd2.mockapi.io/todos/${id}`)
    }
    getTodos()
  }

  return (
    <React.Fragment>
      <TodoForm onAdd={addHandler} />

      <TodoList
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
      />
    </React.Fragment>
  )
}
