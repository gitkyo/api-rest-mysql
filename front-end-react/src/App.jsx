import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todoList, setTodoList] = useState([]);
  

  useEffect(() => {
    // Récupération de la todolist à partir de la base de données
    // ...
    // if (isLoggedIn) {
      // Récupération de la todolist de l'utilisateur

      // const response = await fetch("http://127.0.0.1:3000/tasks")
      // const data = await response.json()
      // console.warn(data)
      // setTodoList(todoList);
    // }

  }, []);
 

  const handleLogin = async () => {
    // Empêcher le rechargement de la page
    event.preventDefault();       
    
    // prepare request to add email and password in body
    const body = {
      email: username,
      password: password
    }
    
    const response = await axios.post("http://127.0.0.1:3000/users/login", body)    

    //if status is ok then set isLoggedin to true
    if (response.status === 200) {
      setIsLoggedIn(true);

      //set cookie for 7 days in frontend
      const date = new Date();
      date.setDate(date.getDate() + 7);
      document.cookie = `token=${response.data.token}; expires=${date.toUTCString()}; path=/`;
      
                 
      
      //set cookie in header of fetch to get TaskList of current user
      const response2 = await fetch("http://127.0.0.1:3000/tasks", {
        headers: {
          "Authorization": `Bearer ${response.data.token}`
        }
      })      
      // const response2 = await fetch("http://127.0.0.1:3000/tasks")
      const data = await response2.json()
      console.warn(data)
      //todo : adapter la data envoyé dans le setTodoList pour que ça marche
      // setTodoList(data);
    }    

    
    // Si l'authentification est réussie,
    if (isLoggedIn) {
      // // Récupération de la todolist de l'utilisateur
      // const response = await fetch("http://127.0.0.1:3000/tasks")
      // const data = await response.json()
      // console.warn(data)
      // setTodoList(todoList);
    }
  };

  // setTodoList(todoList) = async () => {
  //   // Récupération de la todolist de l'utilisateur
  //   const response = await fetch("http://127.0.0.1:3000/tasks")
  // }
  return (
    <div>
      {!isLoggedIn && (
        <div>
          <h1>Connexion</h1>        

          <form onSubmit={handleLogin} method="post" >
            <input
              type="text"
              name="email"
              placeholder="Nom d'utilisateur"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Se connecter</button>
          </form>
        </div>
      )}
      {isLoggedIn && (
        <TodoList todoList={todoList} />
      )}
    </div>
  );
}

export default App;