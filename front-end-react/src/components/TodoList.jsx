import React, { useState, useEffect } from "react";

function TodoList({ todoList }) {
  const [todos, setTodos] = useState([]);
  
  

    useEffect(() => {
    // Mise à jour de la liste des tâches
    setTodos(todoList);
    }, [todoList]);

    //fonction to load Todo on http://127.0.0.1:3000/tasks
    const loadTodo = async () => {
        const response = await fetch("http://127.0.0.1:3000/tasks")
        const data = await response.json()
        setTodos(data)
    }

    loadTodo();

    return (
    <div>
      <h1>Liste des tâches</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} />
            &nbsp;
            {todo.description}
          </li>
        ))}
      </ul>
    </div>
    );
}

export default TodoList;