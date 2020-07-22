const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/labyrinth_db', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


module.exports.User = require('./User.js');
module.exports.RefreshToken = require('./RefreshToken.js');
