const express = require("express");
const app = express();
const session = require("express-session");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static("src/public"));

//session
app.use(session({
    secret: "THRsoftwares",
    cookie: {
        maxAge: 3000000
    }
}));

const connection = require("./database/connection.js")
connection.authenticate().then(() => {
    console.log("db_ON")
}).catch(error => {
    console.log(error)
});

//controllers
const userController = require("./controller/User/UserController");
const employeeController = require("./controller/Employee/EmployeeController");
const productController = require("./controller/Product/ProductController");
const orderController = require("./controller/Order/OrderController");

//models
const User = require("./controller/User/User");
const Product = require("./controller/Product/Product");
const Employee = require("./controller/Employee/Employee");
const Order = require("./controller/Order/Order");

//routes
app.use("/", userController);
app.use("/", employeeController);
app.use("/", productController);
app.use("/", orderController);

app.get("/login", (request, response) => {
    response.render("index")
});

app.get("/", (req, res) => {
    res.render("homePage")
});

app.listen(3000, () => console.log("server_ON"));