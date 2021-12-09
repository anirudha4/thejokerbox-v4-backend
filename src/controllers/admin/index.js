const User = require('../../models/User');

module.exports.getUsers = async (req, res) => {
    const users = User.find();
    res.status(200).json({
        users
    })
}