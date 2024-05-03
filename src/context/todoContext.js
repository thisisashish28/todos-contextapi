import { createContext, useContext } from "react";

export const TodoContext = createContext(
    {
    
        todos: [
            {
                id: 1,
                todo: "",
                completed: "false"
            }
        ],
        addTodo:(todo) => {},
        updatedTodo:(id) => {},
        deletedTodo:(id, todo) => {},
        toggleComplete:(id) =>{},
    }
)

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;