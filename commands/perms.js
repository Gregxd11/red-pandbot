const Discord = require('discord.js');

module.exports = {
  name: 'perms',
  description: 'Checks to see if user has permissions',
  async execute(message, args) {
    const author = message.author.id;

    const isAllowed = await message.guild.members
      .fetch(author)
      .then((res) => res.hasPermission('ADMINISTRATOR'))
      .catch(console.error);

    if (isAllowed) {
      message.channel.send("You've got higher power. ");
    }
    else {
      message.channel.send("You don't have high enough permissions.");
    }
  }
};
