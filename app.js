//imprt d'express pour créer le serveur
import express from 'express'

//lancement de la DB
import { sequelize } from './db/database.js'
sequelize .authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

//création du serveur web
const app = express()

//informe express que les données sont envyer via un formulaire html
// app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 

//informe express d'utiliser le routeur
import { taskRouter } from './routers/task.js'
import { userRouter } from './routers/user.js'
app.use(taskRouter)
app.use(userRouter)

//Get the absolute path of views folder
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const viewsPath = path.join(__dirname, '/views/') 

//set the view engine to pug
app.set('view engine', 'pug')
app.set('views', viewsPath)


//route of home page
app.get('/', (req,res) => {
    res.render("index", {title: "Task Manager"})
})

// 404
app.use((req, res, next) => {
    res.status(404).send(
        "<style>body{background: url(https://httpstatusdogs.com/img/404.jpg) no-repeat center center fixed #000000;}</style>")
})


/*
* TODO : 
* import du model des taches avec l'ORM Sequilize - sauf si on veut jouer avec les requetes SQL 
* Add User model
* Install PostGre / Sequelize & test it
*/

//lancement du serveur 
app.listen(process.env.PORT, () => {
    console.log('Serveur lancé sur le port 3000')
});
