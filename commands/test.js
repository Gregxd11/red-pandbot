const perms = require('../middleware/perms.js');
module.exports = {
  name: 'test',
  description: 'For testing new commands',
  async execute(message, args) {
    const isBotAdmin = await perms.isBotAdmin(message);
    const isBotOwner = await perms.isBotOwner(message);
    const isBotMod = await perms.isBotMod(message);

    if (isBotMod) {
      if (isBotAdmin) {
        if (isBotOwner) {
          message.channel.send('You are the owner of the bot');
        }
        message.channel.send('You are an admin of the bot');
      }
      message.channel.send('You are a mod of the bot');
    }
  }
};
