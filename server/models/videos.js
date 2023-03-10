const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
   Video: sequelize.define("video", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    youtubevideoId: DataTypes.STRING,
    savedVideoListId: DataTypes.INTEGER,
   })
}
