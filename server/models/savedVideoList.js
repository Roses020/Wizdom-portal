const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
   SavedVideoList: sequelize.define("savedVideoList", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   listName: DataTypes.STRING,
   userId: {type: DataTypes.INTEGER,
    
             }
   })
}
