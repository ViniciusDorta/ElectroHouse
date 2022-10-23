const express = require("express");
const User = require("./User");
const Products = require("../Product/Product")
const router = express.Router();
const bcrypt = require("bcryptjs");
const authUser = require("../../middleware/authUser");

router.get("/cadastro", (request, response) => {
    response.render("cadastro")
});

router.post("/cadastrar", (req, res) => {
    var name = req.body.txtName;
    var address = req.body.txtAddress;
    var district = req.body.txtDistrict;
    var number = req.body.txtNumber;
    var postalCode = req.body.txtPostalCode;
    var city = req.body.txtCity;
    var uf = req.body.txtUf;
    var phone = req.body.txtPhone;
    var email = req.body.txtEmail;
    var password = req.body.txtPassword;
    var confPassword = req.body.txtConfirmPassword;

    if (password != confPassword) {
        res.redirect("/cadastro");
    }

    //crypto
    var salt = bcrypt.genSaltSync(15);
    var hash = bcrypt.hashSync(password, salt);

    //form
    User.create({
        name: name,
        address: address,
        district: district,
        number: number,
        postalCode: postalCode,
        city: city,
        uf: uf,
        phone: phone,
        email: email,
        password: hash
    }).then((user) => {
        if (user != undefined) {
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            res.redirect("/dashboard")
        }
        else {
            res.redirect("/cadastro");
        }
    }).catch(error => {
        res.json(error)
    })


});

router.post("/login", (req, res) => {
    var email = req.body.txtEmail;
    var password = req.body.txtPassword;
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user != undefined) {
            var valid = bcrypt.compareSync(password, user.password)
            if (valid) {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                res.redirect("/dashboard")
            }
            else {
                res.redirect("/login");
            }
        }
        else {
            res.redirect("/login");
        }
    })
});

router.get("/dashboard", authUser, (request, response) => {
    Products.findAll().then((products) => {
        response.render("dashboard", { products: products })
    })
});

router.get("/logout", (request, response) => {
    request.session.user = undefined;
    response.redirect("/");
});

router.get("/buyScreen/:id", (req, res) => {
    var id = req.params.id;
    Products.findOne({
        where: {
            id: id
        }
    }).then((product) => {
        if (product != undefined) {
            res.render("buyScreen", { product: product });
        } else {
            res.redirect("/dashboard");
        }
    })
});

module.exports = router;