// import {db} from "../db/database.js";

//import model
import { Task } from "../models/tasks.js";

//controller
export const addTasks = async (req, res) => {    
    //on récupère les données du formulaire
    const newTask = new Task(req.body);

      
    //on ajoute les données dans la base de données sans ORM
    // db.query("INSERT INTO tasks SET ?", newTasks, (error, result) => {
    // if (error) {
    //     return res.status(500).json({ status: "ERROR", error });
    // }    
    //     return res.redirect("/tasks")
    // }); 

    //on ajoute les données dans la base de données avec ORM Sequelize
    try {
        await newTask.save();
        return res.redirect("/tasks")
    } catch (error) {
        return res.status(500).json({ status: "ERROR", error });
    }
    
        
}

export const getTasks = async (req, res) => {
    //get all tasks from database without ORM
    // db.query("SELECT * FROM tasks", (error, result) => {
    //     if (error) {
    //         return res.status(500).json({ status: "ERROR", error });
    //     }
    //     // return res.json({ status: "SUCCESS", result });
    //     return res.render("tasks", {tasks: result})
        
    // });

    //get all tasks from database with ORM
    try {
        const tasks = await Task.findAll();
        return res.render("tasks", {tasks: tasks})
    }catch (error) {
        return res.status(500).json({ status: "ERROR", error });
    }
}