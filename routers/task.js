//import controller
import { addTasks, getMyTasks } from "../controllers/task.js";
import { auth } from "../middleware/auth.js";

//import express
import express from "express";

//create a router
export const taskRouter = express.Router();


//création d'une route post /tasks pour ajouter des taches.
taskRouter.post("/tasks", async function (req, res) {
    console.log(req.body)
    addTasks(req, res)
});

//route to get all tasks without connexion
// taskRouter.get("/tasks", async function (req, res) {   
//     getTasks(req, res)    
// });

taskRouter.get("/tasks", auth, async function (req, res) {
    getMyTasks(req, res)
});

