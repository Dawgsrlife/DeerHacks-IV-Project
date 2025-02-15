import React, { ChangeEvent, FormEvent } from 'react';
// import { ReactComponent as PlusIcon } from "../assets/svg/plus.svg"

export type AddTodoProps = {
    task: string;
    handleSubmitTodo: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent) => void;
}

export const AddTodo = ({
    task,
    handleSubmitTodo,
    handleChange,
}: AddTodoProps) => (
    <form onSubmit={handleSubmitTodo} className="flex items-center bg-gray-800 p-4 rounded-lg">
        <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={handleChange}
            className="bg-transparent text-white w-full"
        />
        <button type="submit" aria-label="Add todo" className="ml-4">
            {/* <PlusIcon className="w-6 h-6" /> */}
        </button>
    </form>
)
