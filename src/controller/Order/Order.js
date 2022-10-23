const sequelize = require("sequelize");
const connection = require("../../database/connection");
const Product = require("../Product/Product");
const User = require("../User/User");

const Order = connection.define("order", {
    valor: {
        type: sequelize.DECIMAL,
        allowNull: false
    },
    data: {
        type: sequelize.DATEONLY,
        allowNull: false
    }
});

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);

Order.sync({ force: false });

module.exports = Order;