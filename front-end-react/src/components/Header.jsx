import React, { useState, useEffect } from "react";


//fonction header qui prend en paramètre la fonction setIsLoggedIn
function Header(  {username }) {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {    
        //si isLoggedIn passe à false alors on supprime le cookie et fetch sur la route logout
        if(!isLoggedIn){
            const date = new Date();
            date.setDate(date.getDate() - 7);
            document.cookie = `token=; expires=${date.toUTCString()}; path=/`;
            const response = fetch("http://127.0.0.1:3000/users/logout")
            //redirect to login page
            window.location.href = "/";
        }

        
      }, []);
 
    return (
        <div>
        <h1>Bonjour {username}</h1>
        <button type="button" onClick={() => setIsLoggedIn(false)}>Se déconnecter</button>
        </div>
    )
}

export default Header;



