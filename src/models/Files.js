// requires
const mongoose = require('mongoose');


// create user schema
const FileSchema = mongoose.Schema({
    filename: String,
    url: String,
    id: String,
    size: String,
    createdAt: String,
    updatedAt: String,
    contentType: String,
    path: String,
    uid: String

});

const Files = mongoose.model('file', FileSchema);

module.exports = Files;
