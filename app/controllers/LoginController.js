const express = require('express');
const router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', async function (req, resp) {
    try {
        var usuario = await models.Usuario.findOne({ where: { login: req.body.login } })

        if (!usuario || !bcrypt.compareSync(req.body.senha, usuario.senha)) {
            res.status(400).send({ error: "Login inválido!" })
        }

        const id = usuario.id;
        var token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 864000
        });

        resp.status(200).send({ auth: true, token: token, usuario });

    } catch {
        resp.status(500).send({ error: "User authentication failed" })
    }

})

module.exports = router;

/*
router.post('/', function (req, resp) {
    models.Usuario.findOne({
        where: {
            login: req.body.login,
        }
    })
        .then(usuario => {
            if (!usuario || !bcrypt.compareSync(req.body.senha, usuario.senha))
                resp.status(403).send({ error: "Login inválido!" });

            const id = usuario.id;
            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 864000
            });

            resp.status(200).send({ auth: true, token: token });

        })
        .catch(err => {
            resp.status(500).send({ error: err })
        })
})
*/