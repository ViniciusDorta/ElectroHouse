const express = require("express");
const Product = require("../Product/Product");
const Order = require("./Order");
const router = express.Router();

const authUser = require('../../middleware/authUser');
const User = require('../User/User');

router.post("/CreateOrder", (req, res) => {
    var userId = Number(req.session.user.id)
    var id = req.body.txtId
    Product.findOne({
        where: {
            id: id
        }
    }).then(product => {
        if (product != undefined) {
            Order.create({
                valor: product.valor,
                data: new Date(),
                userId: userId,
                productId: product.id
            }).then(order => {

                var quantidade = product.quantidade - 1;

                Product.update({
                    quantidade: quantidade
                }, {
                    where: {
                        id: product.id 
                    }
                }).then(() => {
                    res.redirect(`/sucesso`);
                }).catch(err => {
                    console.log(err);
                    res.redirect("/dashboard");
                })
            }).catch(err => {
                console.log(err);
                res.redirect("/dashboard");
            })
        }
    })
});

router.get("/minhasCompras", authUser, (req, res) => {
    var userId = Number(req.session.user.id);

    Order.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Product,
                required: false
            }
        ]
    }).then(orders => {
        res.render('minhasCompras', {orders: orders});
    }).catch(err => {
        res.redirect('/dashboard');
    })

})

router.get("/detalhe/:id", authUser, (req, res) => {

    const id = req.params.id;
    var userId = Number(req.session.user.id);


    Order.findOne({
        where: {
            id,
            userId
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
            res.render("detalhesCompra", {order: order});
        }
        else{
            res.redirect('/dashboard');
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/dashboard');
    })
})

router.get("/sucesso", authUser, (req, res) => {
    res.render('compraRealizada');
})


module.exports = router;