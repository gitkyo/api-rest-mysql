//model des users avec sequelize
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: true,
        validate: {
            isInt: {
                args: true,
                msg: "Age must be a number"
            },            
            min: {
                args: 1,
                msg: "Age must be greater than 0"
            },           
        }
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
        trim: true,
        validate: {
            isEmail: {
                args: true,
                msg: "Email is invalid"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            len: {
                args: [7, 50],
                msg: "Password must be between 7 and 50 characters"
            },
            notContains: {
                args: "password",
                msg: "Password cannot contain the word password"
            }
        }
    },
    //add token to user
    token: {
        type: DataTypes.STRING,
        allowNull: true
    } 
    }, {
        // timestamps: false,
        createdAt: false,
        updatedAt: false        
    }
);

// add static methode to generateAuthToken
User.prototype.generateAuthToken = async function () {    
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();
    return token;
};

// pour faire qqch juste avant un event (middleware)
// comment ça se déclenche pas à tous les event on va modifier le routeur patch
User.beforeSave(async (user, options) => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }    
});

//add findByCredentials to check password
User.findByCredentials = async (email, password) => {
    //on cherche l'utilisateur dans la base de données
    const user = await User.findOne({ where: { email } });
    //si l'utilisateur n'existe pas on renvoie une erreur
    if (!user) {
        throw new Error("Unable to login");
    }
    //on compare le mot de passe envoyé avec celui de la base de données
    const isMatch = await bcrypt.compare(password, user.password);
    //si le mot de passe ne correspond pas on renvoie une erreur
    if (!isMatch) {
        throw new Error("Unable to login");
    }
    //si tout est ok on renvoie l'utilisateur
    return user;
};