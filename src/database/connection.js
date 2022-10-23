const sequelize = require("sequelize");
const connection = new sequelize("cadastro", "root", "NDorta300499", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;