const express = require("express");
const Products = require("./Product");
const router = express.Router();

router.get("/cadastroProdutos", (request, response) => {
    response.render("cadastroProdutos")
});

router.post("/newProducts", (req, res) => {
    var imagem = req.body.txtUrlImage;
    var nome = req.body.txtNome;
    var quantidade = req.body.txtQuantidade;
    var valor = req.body.txtValor;
    var descricao = req.body.txtDescricao;

    Products.create({
        nome: nome,
        imagem: imagem,
        quantidade, quantidade,
        valor: valor,
        descricao: descricao,
    }).then(() => {
        res.redirect("/dashboardEmployee");
    })
});

module.exports = router;