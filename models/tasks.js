//model des taches avec sequelize
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';

export const Task = sequelize.define("task", {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    completed: {
      type: DataTypes.BOOLEAN,
    },
    }, {
        // timestamps: false,
        createdAt: false,
        updatedAt: false        
    }
);