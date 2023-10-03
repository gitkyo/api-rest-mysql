//import model
import { User } from "../models/user.js";

export const addUsers = async (req, res) => {
    //on récupère les données du formulaire
    const newUser = new User(req.body);

    //on ajoute les données dans la base de données avec ORM Sequelize
    try {

        //test si le user existe déjà
        let user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).send({ error: "User already exists" });
        }

        await newUser.save();
        const token = await newUser.generateAuthToken();
        return res.status(201).send({ newUser, token });
        
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

//login user
export const login = async (req, res) => {
    try {
        console.log(req.body)
        //on cherche l'utilisateur dans la base de données
        const user = await User.findByCredentials(req.body.email, req.body.password);
        //on génère un token
        const token = await user.generateAuthToken();

        res.setHeader('Authorization', token);    
        res.setHeader('Access-Control-Expose-Headers', 'authorization');  

        //on renvoie l'utilisateur et le token
        return res.send({ user, token });
    } catch (error) {
        return res.status(401).send({ error: error.message });
    }
}

//logout
export const logout = async (req, res) => {

    try {        
        //find user in database
        const user = await User.findOne({ where: { id: req.user.id } });

        //remove token
        user.token = null;

        //on sauvegarde l'utilisateur
        await user.save();
        //on renvoie un message
        return res.status(200).send({ message: "User logged out" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
