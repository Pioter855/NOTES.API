const Sequelize = require("sequelize");

const sequelize = new Sequelize("notatnik", "root", "Programowanie1!", {
	dialect: "mysql",
	host: "localhost",
	pool: {
		max: 5,
		min: 1,
		acquire: 30000,
		idle: 10000,
	},
});

sequelize.authenticate();

module.exports = { sequelize };
