// require models
const User = require('../../models/User');

// get all users
module.exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json({
        users
    })
}