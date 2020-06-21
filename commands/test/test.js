const perms = require('../../middleware/perms.js');
const test2 = require('./test2.js');
module.exports = {
  name: 'test',
  args: true,
  description: 'For testing new commands',
  async execute(message, args) {
    const isBotAdmin = await perms.isBotAdmin(message);
    if (!isBotAdmin) return;

    console.log(message.content);
    console.log(message);
  }
};
