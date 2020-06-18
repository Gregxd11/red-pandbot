const perms = require('../../middleware/perms.js');
module.exports = {
  name: 'test',
  description: 'For testing new commands',
  async execute(message, args) {
    message.channel.send('hewwo');
  }
};
