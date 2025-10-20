import type { todoListProps } from "./TodoList";

export function CompletedTodos(props:todoListProps) {
    return (
        <div> {
        props.todo
            .filter((item) => {return item.completed})
            .map((item) => {return (
                <div>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <p>{`Due Date: ${item.due}`}</p>
                    <p>{`Completed: ${item.completed ? "Yes" : "No"}`}</p>
                    <button onClick={(e) => {props.deleteTodo(e, item)}}>Delete</button>
                    <button onClick={(e) => {props.toggleCompleted(e, item)}}>Mark Incomplete</button>
                </div>
            )})
        } </div>
    );
}