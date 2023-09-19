//import controller
import { addUsers, getUsers, login } from "../controllers/user.js";

//import express
import express from "express";

//create a router
export const userRouter = express.Router();


//création d'une route post /tasks pour ajouter des taches.
userRouter.post("/users", async function (req, res) {
    console.log(req.body)
    addUsers(req, res)
});

//route to get tasks
userRouter.get("/users", async function (req, res) {   
    getUsers(req, res)    
});

//route to login
userRouter.post("/users/login", async function (req, res) {
    login(req, res)
});
