const express = require('express');
let router = express.Router();

router.route('/devops')
    .get((req, res) => {
        res.send('GET - /book/computer/devops')
    })

router.route("/fullstack")
    .post((req, res) => {
        res.send(' POST - /book/computer/fullstack')
    })

module.exports = router