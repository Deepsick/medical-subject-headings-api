const { Sequelize, DataTypes } = require('sequelize');
const { getConnection } = require('../db');

const sequelize = getConnection();

const MeshCategoryChild = sequelize.define('MeshCategoryChild', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'name',
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'code',
  }
}, {
  tableName: 'mesh_category_children',
});

MeshCategoryChild.associations = (models) => MeshCategoryChild.belongsTo(models.MeshCategory, {
  foreignKey: 'parent_id',
  as: 'parent',
});

module.exports = MeshCategoryChild;