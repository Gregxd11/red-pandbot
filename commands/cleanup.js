const Discord = require('discord.js');
const perms = require('../middleware/perms.js');
module.exports = {
  name: 'cleanup',
  description: 'Cleans up messages in a channel',
  usage: '<number of messages to delete>',
  args: true,
  async execute(message, args) {
    const isAdmin = await perms.isServerAdmin(message);

    if (args[1]) {
      return message.channel.send(
        `No second arguments! Proper usage is !\`${name} ${usage}.\``
      );
    }
    if (isAdmin) {
      message.channel.bulkDelete(args[0]);
    }
    else {
      message.channel.send(
        'You must be an admin of the server to use this command.'
      );
    }
  }
};
