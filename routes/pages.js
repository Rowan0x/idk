const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index')
})
router.get('/captcha', (req, res) => {
    res.render('captcha')
})



module.exports = router;