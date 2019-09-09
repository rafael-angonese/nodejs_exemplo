const express = require('express')
const router = express.Router()
const models = require('../models')
const bodyParser = require('body-parser')
const security = require("../middlewares/auth")
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const bcrypt = require("bcryptjs")

router.post('/', async function (req, res) {
    let hash = bcrypt.hashSync(req.body.senha, 10)

    try {
        var usuario = await models.Usuario.findOne({ where: { login: req.body.login } })
        if (usuario) {
            return res.status(400).json({ error: "User already exists" });
        }

        var usuario = await models.Usuario.create({
            nome: req.body.nome,
            login: req.body.login,
            senha: hash
        })

        res.status(200).send(usuario)
    } catch {
        res.status(500).send({ error: "User registration failed" })
    }

})

router.get('/', security.verifyJWT, async function (req, res) {
    try {
        var usuarios = await models.Usuario.findAll()

        res.status(200).send(usuarios)
    } catch {
        res.status(400).send({ error: "User get all failed" })
    }
})

router.get('/:id', security.verifyJWT, async function (req, res) {

    try {
        var usuario = await models.Usuario.findByPk(req.params.id)
        if (!usuario) {
            res.status(404).send({ error: "User not found" })
        }

        res.status(200).send(usuario)
    } catch (err) {
        res.status(400).send({ error: "User find by id failed" })
    }

})

router.put('/:id', security.verifyJWT, async function (req, res) {
    try {
        var usuario = await models.Usuario.findByPk(req.params.id)
        if (!usuario) {
            res.status(404).send({ error: "User not found" })
        }

        let hash = bcrypt.hashSync(req.body.senha, 10)
        var usuario = await usuario.update({
            nome: req.body.nome,
            login: req.body.login,
            senha: hash
        })

        res.status(200).send(usuario)
    } catch {
        res.status(400).send({ error: "User update failed" })
    }

})

router.delete('/:id', security.verifyJWT, async function (req, res) {
    try {
        var usuario = await models.Usuario.findByPk(req.params.id)
        if (!usuario) {
            res.status(404).send({ error: "User not found" })
        }

        var usuario = await models.Usuario.destroy({ where: { id: req.params.id } })

        res.status(200).send({ success: "User deleted" })
    } catch {
        res.status(400).send({ error: "User delete failed" })
    }

})

module.exports = router

/*
router.post('/', function (req, res) {
    let hash = bcrypt.hashSync(req.body.senha, 10)

    models.Usuario.create({
        nome: req.body.nome,
        login: req.body.login,
        senha: hash
    }).then(
        usuario => res.status(200).send(usuario)
    ).catch(err => res.status(500).send(err))
})

router.get('/', security.verifyJWT, function (req, res) {

    models.Usuario.findAll().then(
        usuarios => res.status(200).send(usuarios)
    )
})

router.get('/:id', security.verifyJWT, function (req, res) {
    models.Usuario.findByPk(req.params.id)
        .then(usuario => {
            if (!usuario) {
                res.status(404).send("NOT FOUND")
            }

            res.status(200).send(usuario)
        }).catch(err => res.status(500).send(err))
})

router.put('/:id', security.verifyJWT, function (req, res) {
    models.Usuario.findByPk(req.params.id).then(usuario => {
        if (!usuario) {
            res.status(404).send("NOT FOUND")
        }

        let hash = bcrypt.hashSync(req.body.senha, 10)
        usuario.update({
            nome: req.body.nome,
            login: req.body.login,
            senha: hash
        })
        res.status(200).send(usuario)
    })

})

router.delete('/:id', security.verifyJWT, function (req, res) {
    models.Usuario.findByPk(req.params.id).then(usuario => {
        if (!usuario) {
            res.status(404).send("NOT FOUND")
        }

        models.Usuario.destroy({
            where: { id: req.params.id }
        }).then(usuario => {
            res.status(200).send('Excluído com sucesso')
        })

    })

})
*/