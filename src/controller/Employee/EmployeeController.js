const express = require("express");
const Employee = require("./Employee");
const Products = require("../Product/Product")
const router = express.Router();
const bcrypt = require("bcryptjs");
const authEmployee = require("../../middleware/authEmployee");
const Order = require('../Order/Order');
const Product = require('../Product/Product');
const User = require('../User/User');

router.get("/loginEmployee", (req, res) => {
    res.render("loginEmployee")
});

router.post("/loginEmployee", (req, res) => {
    var email = req.body.txtEmail;
    var password = req.body.txtPassword;
    Employee.findOne({
        where: {
            email: email
        }
    }).then(employee => {
        if (employee != undefined) {
            var valid = bcrypt.compareSync(password, employee.clave)
            if (valid) {
                req.session.employee = {
                    id: employee.id,
                    name: employee.nombre,
                    email: employee.email
                }
                res.redirect("/dashboardEmployee")
            }
            else {
                res.redirect("/loginEmployee");
            }
        }
        else {
            res.redirect("/loginEmployee");
        }
    })
});

router.get("/dashboardEmployee", authEmployee, (request, response) => {
    Products.findAll().then((products) => {
        response.render("dashboardEmployee", { products: products })
    })
});

router.get("/cadastroProdutos", authEmployee, (request, response) => {
    response.render("cadastroProdutos")
});

router.get("/logout", (request, response) => {
    request.session.employee = undefined;
    response.redirect("/loginEmployee");
});

router.get("/listar-vendas", authEmployee, (req, res) => {
    Order.findAll({
        include: [
            {
                model: Product,
                required: false
            },
            {
                model: User,
                required: false
            }
        ]
    }).then(orders => {
        res.render('listagemVendas', {orders: orders});
    })
})

router.get("/detalheVenda/:id", authEmployee, (req, res) => {
    const id = req.params.id;


    Order.findOne({
        where: {
            id
        },
        include: [
            {
                model: Product,
                required: false
            },
            {
                model: User,
                required: false
            }
        ]
    }).then(order => {
        if(order != undefined){
            res.render("detalhesVenda", {order: order});
        }
        else{
            res.redirect('/dashboardEmployee');
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/dashboardEmployee');
    })
})

module.exports = router;