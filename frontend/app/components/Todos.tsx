import React, { ChangeEvent, FormEvent, useState } from "react"
import { v4 as uuidv4 } from "uuid"

// Imports for row component and data

import { Row } from "./Row"
import { data } from "../todos"
import { AddTodo } from "./AddTodo"
import { s } from "framer-motion/dist/types.d-6pKw1mTI"

type Todo = {
    id: string
    task: string
    isCompleted: boolean
}

export const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>(data)
    const [task, setTask] = useState("")
    const todoLength = todos.length
    const hasTodos = todoLength > 0
    const remainingTodos = todos.filter((todo) => !todo.isCompleted).length

    const handleAddTodo = (todo: Todo) => {
        const updatedTodos = [...todos, todo]
        setTodos(updatedTodos)
        setTask("")
    }

    const handleChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        setTask(target.value)
    }

    const handleSubmitTodo = (e: FormEvent) => {
        e.preventDefault()
        
        const todo = {
            id: uuidv4(),
            task,
            isCompleted: false,
        }
        task && handleAddTodo(todo)
    }

    const handleDeleteTodo = (id: string) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id)
        setTodos(updatedTodos)
    }

    const handleCheckTodo = (id: string) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted,
                }
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    return (
        <section
        className = "w-10/12 sm:w-10/11 md:w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center"
        >
            <AddTodo
                task={task}
                handleChange={handleChange}
                handleSubmitTodo={handleSubmitTodo}
            />
            <div
            className="h-10"
            >
            </div>
            {todos.map((todo) => (
                <Row
                    key={todo.id}
                    todo={todo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleCheckTodo={handleCheckTodo}
                />
            ))}
            {!hasTodos && (
                <p
                className = "mb-5 text-xl text-red-500 uppercase"
                >
                    No tasks to show!
                </p>
            )}            
            {hasTodos && (
                <p>{`${remainingTodos} of ${todoLength} remaining`}</p>
            )}
        </section>
    )
}
