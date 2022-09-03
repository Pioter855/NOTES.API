const Sequelize = require("sequelize");

const sequelize = new Sequelize("db", "root", "password", {
	dialect: "mysql",
	host: "localhost",
	pool: {
		max: 5,
		min: 1,
		acquire: 30000,
		idle: 10000,
	},
	port:3307,
});

sequelize.authenticate();

module.exports = { sequelize };
