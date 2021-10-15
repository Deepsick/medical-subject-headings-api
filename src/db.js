const { Sequelize } = require('sequelize');
require('dotenv').config()


// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'postgres',
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();