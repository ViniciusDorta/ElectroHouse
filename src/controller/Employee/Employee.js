const sequelize = require("sequelize");
const connection = require("../../database/connection");

const Employee = connection.define("employee", {
    nombre: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    clave: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Employee.sync({ force: false });

module.exports = Employee;