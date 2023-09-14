import {db} from "../db/database.js";

//controller
export const addTasks = async (req, res) => {    
    //on récupère les données du formulaire
    let newTasks = { ...req.body };    
      
    //on ajoute les données dans la base de données
    db.query("INSERT INTO tasks SET ?", newTasks, (error, result) => {
    if (error) {
        return res.status(500).json({ status: "ERROR", error });
    }    
        return res.redirect("/tasks")
    }); 
}

export const getTasks = async (req, res) => {
    //controller    
    db.query("SELECT * FROM tasks", (error, result) => {
        if (error) {
            return res.status(500).json({ status: "ERROR", error });
        }
        // return res.json({ status: "SUCCESS", result });
        return res.render("tasks", {tasks: result})
        
    });
}