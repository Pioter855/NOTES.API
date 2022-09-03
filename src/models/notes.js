const Sequelize = require('sequelize')
const sequelize = require('../database').sequelize




const Notes = sequelize.define(
	"Notes",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allownull: false,
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

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`);
//   });

module.exports = { Notes }