const { Sequelize, DataTypes } = require('sequelize');
const { getConnection } = require('../db');
const MeshCategory = require('./MeshCategory');

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
    field: 'name',
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'code',
  }
}, {
  tableName: 'mesh_category_children',
});


module.exports = MeshCategoryChild;