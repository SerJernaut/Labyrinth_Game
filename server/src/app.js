const path = require('path');
const { Server } = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const server = new Server(app);
const router = require('./router');
const {SERVER_PORT} = require('./constants')
const PORT = process.env.PORT || SERVER_PORT;
const SocketConnectionController = require('./controllers/sockets/SocketConnectionController')

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../uploads')));

app.use('/api', router);

server.listen(PORT, () =>
  console.log(`Example app listening on port ${ PORT }!`),
);

const socketController = new SocketConnectionController(server);

module.exports.controller = socketController;
