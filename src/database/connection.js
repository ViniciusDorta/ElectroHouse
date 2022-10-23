const sequelize = require("sequelize");
const connection = new sequelize("cadastro", "root", "SenhaBddMySQL", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
