const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/expense_tracker.sqlite', 
});

module.exports = sequelize;
