# projet API Rest - MySQL

## Install

npm install

## start

npm run start

## dev

npm run dev

## database

1. Lancer xampp + mysql
2. Sur l’invite de commande de xampp : se connecter à la bdd
`mysql -u [username] -p`
3. Créer une BDD
`CREATE DATABASE restful_api;`
4. Installer mysqlWorkbench
5. Se connecter et ajouter une table
`CREATE TABLE tasks(id INT AUTO_INCREMENT PRIMARY KEY, description VARCHAR(50) NOT NULL, complete BOOLEAN NOT NULL);`