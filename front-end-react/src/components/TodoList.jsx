import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList({ todoList }) {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  
    
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

    const addOneTask = async (event) => {
      console.log("add one task")
      // Empêcher le rechargement de la page
      event.preventDefault();       
      // prepare request to add email and password in body
      const body = {
        description: description,
        completed: completed

      }
      
      try {

        //get current token in cookie
        const token = document.cookie.split('=')[1]
        console.log('token', token)
        //add token in headers 
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        
        //send request to add task
        const response = await axios.post("http://127.0.0.1:3000/tasks", body, config)        

        //if code 200
        if (response.status === 200) {
          console.log("task added")
          
          //add todo in todolist and reload component     
          setTodos([...todos, body]);

        } 

      
      }catch(error){
        console.log(error)
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
      <form onSubmit={addOneTask} method="post">
        <input 
          type="text" 
          name="description" 
          placeholder="Faire la vaiselle" 
          onChange={(event) => setDescription(event.target.value)}          
          required
        />
        <input 
          type="checkbox" 
          name="completed"
          onChange={(event) => setCompleted(event.target.checked)} 
        />
        <button type="submit">Ajouter</button>
      </form>


    </div>
    );
}

export default TodoList;