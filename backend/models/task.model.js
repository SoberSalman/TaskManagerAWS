// models/task.model.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./user.model');

const Task = db.define('task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Establish relationship
Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks'
});

module.exports = Task;