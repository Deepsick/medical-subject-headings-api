const { Sequelize, DataTypes } = require('sequelize');
const { getConnection } = require('../db');
const sequelize = getConnection();

const MeshCategory = sequelize.define('MeshCategory', {
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
  prefix: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'prefix',
  },
}, {
  tableName: 'mesh_categories',
});


module.exports = MeshCategory;