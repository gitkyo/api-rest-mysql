import React, { useState, useEffect } from "react";

function TodoList({ todoList }) {
  const [todos, setTodos] = useState([]);
    
    useEffect(() => {
    // Mise à jour de la liste des tâches
    setTodos(todoList);
    }, [todoList]);
    
    const changeStatusTask = async (event) => {
        console.log("edit status tasks")
        // Empêcher le rechargement de la page
        event.preventDefault();       
        // prepare request to add email and password in body
        const body = {
          completed: event.target.checked
        }
      }

    return (
    <div>
      <h1>Liste des tâches</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>           

            <input id={todo.id} type="checkbox" checked={todo.completed ? 1 : 0}   onChange={changeStatusTask} />
            &nbsp;
            <label htmlFor={todo.id}>{todo.description}</label>

          </li>
        ))}
      </ul>

      <h2>Ajouter une tâche</h2>
      <form>
        <input type="text" />
        <button type="submit">Ajouter</button>
      </form>


    </div>
    );
}

export default TodoList;