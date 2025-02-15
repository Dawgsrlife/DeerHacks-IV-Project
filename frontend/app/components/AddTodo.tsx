import React, { ChangeEvent, FormEvent } from 'react';
// import { ReactComponent as PlusIcon } from "../assets/plus.svg";

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
    <form className="flex justify-between w-full" onSubmit={handleSubmitTodo}>
        <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
            onChange={handleChange}
        />
        <button type="submit" aria-label="Add todo" className="ml-4">
            {/* <PlusIcon className="w-6 h-6" /> */}
        </button>
    </form>
)
