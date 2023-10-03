import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import axios from "axios";

/* 
TODO : *
* Add button remove tasks
* Add button edit tasks
* Add headers to discard CSRF attacks
* Add routeur to manage different pages
*/

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [wantToLoginIn, setWantToLoginIn] = useState(false);
  const [wantToSubIn, setWantToSubIn] = useState(false);
  const [messageLogin, setMessageLogin] = useState("");
  

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

    //setUsername
    setUsername(username);
    
    if(wantToLoginIn) setWantToLoginIn(false)
    if(wantToSubIn) setWantToSubIn(false)    
    
    let urlToLogOrSub = ""    
    if (wantToLoginIn) urlToLogOrSub = "http://127.0.0.1:3000/users/login"
    else if (wantToSubIn) urlToLogOrSub = "http://127.0.0.1:3000/users/subscribe"
      
    try {
      const response = await axios.post(urlToLogOrSub, body)  
           
      //if status is ok then set isLoggedin to true
      if (response.status === 200 || response.status === 201) {
        
        //set isLoggedin to true
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
        const data = await response2.json()
        console.warn(data)      
        setTodoList(data.tasks);
      }
    } catch (error) {    
      console.log(error)  
      setMessageLogin(error.message)
    }          
    
    
  };

  return (
    <div>
      {!isLoggedIn && (
        <div>
          <h1>Connexion</h1>        
          <p>try with :<br/> pierre@pierre.com <br/> 123456789</p>
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
            <button type="submit" onClick={setWantToLoginIn} >Se connecter</button>
            <button type="submit" onClick={setWantToSubIn}>S'enregistrer</button>
          </form>          
          <p>{messageLogin}</p>
        </div>
      )}
      {isLoggedIn && (
        <>
        {/* add Header components with username and setIsLoggedIn */}
        <Header username={username} />        
        <TodoList todoList={todoList} />
        </>
      )}
    </div>
  );
}

export default App;