//connexion avec la db
import mysql from 'mysql'


export const DBConnection = async () => {

    //Our Database Config
    const DB_HOST = process.env.DB_HOST;
    const DB_DATABASE = process.env.DB_DATABASE;
    const DB_USERNAME = process.env.DB_USERNAME;
    const DB_PASSWORD = process.env.DB_PASSWORD;

    //Connection to MySQL database    
    const db = mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_DATABASE,
    });

  return db; 

}