import React from "react";

const TodoItem = ({ todo, completeTodo, deleteTodo }) => {
    return (
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <span onClick={() => completeTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;
