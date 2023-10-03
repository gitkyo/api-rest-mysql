//import controller
import { addUsers, getUsers, login, logout } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

//import express
import express from "express";

//create a router
export const userRouter = express.Router();


//création d'une route post /tasks pour ajouter des taches.
// userRouter.post("/users", async function (req, res) {
//     console.log(req.body)
//     addUsers(req, res)
// });

//route to get tasks
userRouter.get("/users", async function (req, res) {   
    getUsers(req, res)    
});

//route to login
userRouter.post("/users/login", async function (req, res) {
    login(req, res)
});

//route to logout
userRouter.post("/users/logout", auth, async function (req, res) {
    logout(req, res)
});

//route to subscribe
userRouter.post("/users/subscribe", async function (req, res) {
    addUsers(req, res)
});