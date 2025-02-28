const express = require('express');
const verifyToken = require('../middlewares/verifyToken');


const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    return res.status(200).send({ msg: 'logged in user' })
})

module.exports = router;
