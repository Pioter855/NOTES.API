const Sequelize = require('sequelize')
const sequelize = require('../database').sequelize




const Notes = sequelize.define(
	"notes",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		title: {
			type: "VARCHAR(100)",
			allownull: false,
		},
		note: {
			type: Sequelize.STRING,
			allownull: true,
		},
	},
	{
		paranoid: true,
	}
);

module.exports = { Notes }