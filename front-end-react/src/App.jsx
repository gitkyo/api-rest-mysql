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
      
    }    

    
    // Si l'authentification est réussie,
    if (isLoggedIn) {
      // Récupération de la todolist de l'utilisateur
      // ...
      setTodoList(todoList);
    }
  };

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