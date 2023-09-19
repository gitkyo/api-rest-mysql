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
    //add owner to task 
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        ref: {
            model: 'User',
            key: 'id'
        }
      }
      }, {
          // timestamps: false,
          createdAt: false, 
          updatedAt: false        
      }
    
    
); 