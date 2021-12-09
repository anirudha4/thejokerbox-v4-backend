// requires
const router = require('express').Router();

router.get('/', (req, res) => res.status(200).json({
    working: true
}));

router.use('/users', require('./users'));

router.use('/admin', require('./admin'));

module.exports = router;