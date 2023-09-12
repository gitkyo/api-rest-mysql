//load env variables
import dotenv from 'dotenv';
dotenv.config();

//imprt d'express pour créer le serveur
import express from 'express'


//lancement de la DB
import { DBConnection } from './db/database.js'
const db = await DBConnection()


//création du serveur web
const app = express()

//informe express que les données sont en json
app.use(express.json())

//import du model des taches avec l'ORM sequilize - sauf si on veut jouer avec les requetes SQL 

//controller
const addTasks = async (req, res) => {    
    //on récupère les données du formulaire
    let newTasks = { ...req.body };    
      
    //on ajoute les données dans la base de données
    db.query("INSERT INTO tasks SET ?", newTasks, (error, result) => {
    if (error) {
        return res.status(500).json({ status: "ERROR", error });
    }
  
    return res.json({ status: "SUCCESS" });
    });
}


//création d'une route post /tasks pour ajouter des taches.
app.post("/tasks", async function (req, res) {
    addTasks(req, res)
});

//route to get tasks
app.get("/tasks", async function (req, res) {
    db.query("SELECT * FROM tasks", (error, result) => {
        if (error) {
            return res.status(500).json({ status: "ERROR", error });
        }
        return res.json({ status: "SUCCESS", result });
    });
});

//lancement du serveur 
app.listen(process.env.PORT, () => {
    console.log('Serveur lancé sur le port 3000')
});
