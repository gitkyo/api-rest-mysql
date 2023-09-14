//import controller
import { addTasks, getTasks } from "../controllers/task.js";

//import express
import express from "express";

//create a router
export const taskRouter = express.Router();


//création d'une route post /tasks pour ajouter des taches.
taskRouter.post("/tasks", async function (req, res) {
    console.log(req.body)
    addTasks(req, res)
});

//route to get tasks
taskRouter.get("/tasks", async function (req, res) {   
    getTasks(req, res)    
});

