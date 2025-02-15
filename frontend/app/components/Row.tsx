type Todo = {
    id: string
    task: string
    isCompleted: boolean
}

type TodoProps = {
    todo: Todo
    handleDeleteTodo: (id: string) => void
    handleCheckTodo: (id: string) => void
}

export const Row = ({
    todo: { task, isCompleted, id },
    handleDeleteTodo,
    handleCheckTodo
}: TodoProps) => (
    <div
        className={`
            flex items-center justify-between w-full p-4 rounded-lg
            ${isCompleted ? "bg-gray-350 line-through" : "bg-green-300"}`}
    >
        <p
            className={`
                ml-2 text-xl font-sans font-medium
                ${isCompleted ? "text-white line-through" : "text-gray-800"}
            `}
        >
            {task}</p>
        <div
        className = "w-1/6 flex justify-end items-center mr-2"
        >
            <button
                aria-label="Delete a todo"
                className="h-7 w-7 flex justify-center items-center bg-red-400 hover:bg-red-500 text-white font-bold rounded-full" 
                onClick={() => handleDeleteTodo(id)}
            >
                X
            </button>
            <input
                type="checkbox"
                checked={isCompleted}
                className="form checkbox h-7 w-7"
                onChange={() => handleCheckTodo(id)}
            />
        </div>
    </div>
)
