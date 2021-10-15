const { Sequelize } = require('sequelize');
require('dotenv').config()


const getConnection = () => (
  new Sequelize({
    dialect: 'postgres',
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  })
);

module.exports = {
  getConnection,
};
