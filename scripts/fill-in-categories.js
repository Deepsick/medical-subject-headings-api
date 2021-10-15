const { getConnection } = require("../src/db");
const { MeshCategory, MeshCategoryChild } = require('../src/models');
const { scrapHeadings } = require('./parser');

MeshCategoryChild.belongsTo(MeshCategory);
MeshCategory.hasMany(MeshCategoryChild, { as: 'children' });

(async () => {
  try {
    const records = await scrapHeadings();

    const sequelize = await getConnection();
    await sequelize.authenticate();
    // await sequelize.sync({ force: true, sync: true });
    await MeshCategory.bulkCreate(records, { include: [{ model: MeshCategoryChild, as: 'children' }] });
    // console.log(await MeshCategory.findAll({ include: { model: MeshCategoryChild, as: 'children'}}))
  } catch (error) {
    console.error(error);
  }
})();