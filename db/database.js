//load env variables
import dotenv from 'dotenv';
dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DIALECT = process.env.DB_DIALECT;
 
/*
//connexion avec la db sans ORM
import mysql from 'mysql'
//Connection to MySQL database    
export const db = mysql.createConnection({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
});
*/


//connexion avec ORM Sequelize
import { Sequelize } from 'sequelize';
export const sequelize  = new Sequelize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: DB_DIALECT
  }
);



  

