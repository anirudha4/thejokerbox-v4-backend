// requires
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload')
// init app
const app = express();

// firebase admin setup
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thejokerbox-v0.firebaseio.com"
});
exports.storageRef = admin.storage().bucket(`gs://thejokerbox-v0.appspot.com`);


// middlewares
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:3000' // client URL
}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require routes
app.use('/api', require('./routes'));

module.exports = app;