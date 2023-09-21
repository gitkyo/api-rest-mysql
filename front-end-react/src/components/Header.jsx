import React, { useState, useEffect } from "react";
import axios from "axios";


//fonction header qui prend en paramètre la fonction setIsLoggedIn
function Header(  {username }) {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {    
        
        if(!isLoggedIn){
            console.log("isLoggedIn")         
        }
        
    }, []);

    const setIsLoggedOut = async () => {
        
        setIsLoggedIn(false)        
        
        //get cookie named token  
        const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];        
        
        //post request to logout with token in headers       
        const response = await axios.post("http://127.0.0.1:3000/users/logout", {}, {
            headers: {
                "Authorization": `Bearer ${token}`,        
            }
        })
            
        //si code 200
        if (response.status === 200) {
            console.log("logout")

            //remove cookie token
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

            //redirect to login page
            window.location.href = "/";
        }   
    }

    return (
        <div>
        <h1>Bonjour {username}</h1>
        <button type="button" onClick={() => setIsLoggedOut(false)}>Se déconnecter</button>
        </div>
    )
}

export default Header;



