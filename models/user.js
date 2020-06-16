const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: String,
  name: String,
  balance: {
    type: Number,
    default: 0
  },
  rpRole: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('User', userSchema);
