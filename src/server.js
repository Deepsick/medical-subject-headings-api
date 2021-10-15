const { sequelize } = require("./models/MeshCategory");
const {  MeshCategory, MeshCategoryChild } = require('./models');


(async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      const categories = await MeshCategory.findAll();
      console.log(categories)
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();