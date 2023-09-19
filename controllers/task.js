//import model
import { Task } from "../models/tasks.js";
import jwt from "jsonwebtoken";

//controller
export const addTasks = async (req, res) => {    
    //on récupère les données du formulaire
    const newTask = new Task(req.body);

    //get current ID user from token header sent by client
    // le token est envoyé dans le header de la requete sous le champs Authorization. On isole le token avec la méthode replace
    const token = req.header("Authorization").replace("Bearer ", "");
    //on decode le token pour récupérer l'id de l'utilisateur avec la méthode verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;    
    //add id of current user to owner field
    newTask.owner = userId
          
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
        return res.json({ status: "SUCCESS", newTask });
        // return res.redirect("/tasks")
    } catch (error) {
        return res.status(500).json({ status: "ERROR", error });
    }
    
        
}

//get tasks of current user 
export const getMyTasks = async (req, res) => {
    
    //id of current user
    const userId = req.user.id;

    try {
        const tasks = await Task.findAll({ where: { owner: userId } });
        // send to client in json
        return res.status(200).json({ status: "SUCCESS", tasks });
    }catch (error) {
        return res.status(500).json({ status: "ERROR", error });
    }
   
}