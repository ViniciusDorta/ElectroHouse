const sequelize = require("sequelize");
const connection = require("../../database/connection");

const User = connection.define("user", {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    address: {
        type: sequelize.STRING,
        allowNull: false
    },
    district: {
        type: sequelize.STRING,
        allowNull: false
    },
    number: {
        type: sequelize.STRING,
        allowNull: false
    },
    postalCode: {
        type: sequelize.STRING,
        allowNull: false
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
});

User.sync({ force: false });

module.exports = User;