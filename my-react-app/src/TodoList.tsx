import "./App.css";

export type todoListProps = {
    todo: Array<{
        id: number;
        title: string;
        description: string;
        due: string;
        completed: boolean;
    }>;
    toggleCompleted: any;
    deleteTodo: any;
}

export function TodoList(props:todoListProps) {
    return (
        <div> {
        props.todo
            .filter((item) => {return !item.completed})
            .map((item) => {return (
                <div>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <p>{`Due Date: ${item.due}`}</p>
                    <p>{`Completed: ${item.completed ? "Yes" : "No"}`}</p>
                    <button onClick={(e) => {props.deleteTodo(e, item)}}>Delete</button>
                    <button onClick={(e) => {props.toggleCompleted(e, item)}}>Complete</button>
                </div>
            )})
        } </div>
    );
}