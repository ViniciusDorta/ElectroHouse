const sequelize = require("sequelize");
const connection = require("../../database/connection");

const Product = connection.define("product", {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    },
    valor: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    imagem: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Product.sync({ force: false });

module.exports = Product;