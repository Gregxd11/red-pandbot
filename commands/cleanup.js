const Discord = require('discord.js');

module.exports = {
  name: 'cleanup',
  description: 'Cleans up messages in a channel',
  usage: '<number of messages to delete>',
  args: true,
  async execute(message, args) {
    const author = message.author.id;

    const isAllowed = await message.guild.members
      .fetch(author)
      .then((res) => res.hasPermission('ADMINISTRATOR'))
      .catch(console.error);

    if (args[1]) {
      return message.channel.send(
        `No second arguments! Proper usage is !\`${name} ${usage}.\``
      );
    }
    if (isAllowed) {
      message.channel.bulkDelete(args[0]);
    }
    else {
      message.channel.send('Insufficient permissions!');
    }
  }
};
