// requires
const router = require('express').Router();

// controllers for all
const { getUsers } = require('../controllers/users');


router.get('/', getUsers);

module.exports = router