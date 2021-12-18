// requires
const router = require('express').Router();

router.get('/', (req, res) => res.status(200).json({
    working: true
}));

router.use('/files', require('./files'));

module.exports = router;