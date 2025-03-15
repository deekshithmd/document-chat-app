const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');


const Documents = sequelize.define('documents', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    docUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Documents, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Documents.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Documents;