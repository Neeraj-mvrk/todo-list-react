import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Filter from "./Filter";

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch("https://dummyjson.com/todos");
            const data = await response.json();
            const apiTodos = data.todos.map((todo) => ({
                id: todo.id,
                text: todo.todo,
                completed: todo.completed,
            }));

            const localStorageTodos = JSON.parse(localStorage.getItem("todos")) || [];
            const mergedTodos = [...apiTodos, ...localStorageTodos];
            const uniqueTodos = mergedTodos.filter(
                (value, index, self) =>
                    index === self.findIndex((t) => t.id === value.id)
            );

            setTodos(uniqueTodos);
        };

        fetchTodos();
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const completeTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "completed") return todo.completed;
        if (filter === "pending") return !todo.completed;
        return true; 
    });

    return (
        <div className="todo-app">
            <h1>Todo List</h1>
            <AddTodo addTodo={(text) => setTodos([...todos, { id:todos.length+1, text, completed: false }])} />
            <Filter setFilter={setFilter} />
            <TodoList
                todos={filteredTodos}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
            />
        </div>
    );
};

export default TodoApp;
