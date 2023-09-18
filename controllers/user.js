//import model
import { User } from "../models/user.js";

export const addUsers = async (req, res) => {
    //on récupère les données du formulaire
    const newUser = new User(req.body);

    //on ajoute les données dans la base de données avec ORM Sequelize
    try {
        await newUser.save();
        return res.json({ status: "SUCCESS", newUser });
        // return res.redirect("/")
    } catch (error) {
        return res.status(500).json({ status: "ERROR", error });
    }
}

export const getUsers = async (req, res) => {
    //get all tasks from database with ORM
    try {
        const users = await User.findAll();
        // return res.render("users", {users: users})
        return res.json({ status: "SUCCESS", users });
    }catch (error) {
        return res.status(500).json({ status: "ERROR", error });
    }
}