// core nodejs modules
const http = require('http');

// requires
const mongoose = require('mongoose');

// require app
const app = require('./app');

// socket io setup
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});
const socketIO = require('./sockets')(io)

// env setup
require('dotenv').config();

// mongoose setup
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(_ => console.log("connected to mongoDB"))
.catch(error => console.log(error.message));



// listen to request
server.listen(process.env.PORT || 8000, () => console.log(`Server up and running. \nVisit http://localhost:${process.env.PORT}/api`)); 