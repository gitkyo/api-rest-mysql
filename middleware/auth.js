import jsonwebtoken from 'jsonwebtoken'
import { User } from '../models/user.js'

export const auth = async (req, res, next) => {
    try {
        //on récupère le token dans le header de la requete
        const token = req.header("Authorization").replace("Bearer ", "");
        //on decode le token pour récupérer l'id de l'utilisateur avec la méthode verify
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;
        //on cherche l'utilisateur dans la base de données
        const user = await User.findOne({ where: { id: userId } });
        //si l'utilisateur n'existe pas on renvoie une erreur
        if (!user) {
            throw new Error("User not found");
        }
        //on ajoute le token à la requete
        req.token = token;
        //on ajoute l'utilisateur à la requete
        req.user = user;
        //on passe à la suite
        next();
    } catch (error) {
        res.status(401).send({ error: "Not authorized to access this resource" });
    }
}