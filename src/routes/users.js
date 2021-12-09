const { getUsers } = require('../controllers/users');

// requires
const router = require('express').Router();

router.get('/', getUsers);


module.exports = router;