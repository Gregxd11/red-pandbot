const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user.js');
const perms = require('../../middleware/perms.js');

module.exports = {
  name: 'seed',
  description: 'Seeds the bots database with existing guild members',
  async execute(message, args) {
    const isBotOwner = await perms.isBotOwner(message);
    const currentMems = await message.guild.members
      .fetch()
      .then((members) => members.array())
      .catch(console.error);
    if (isBotOwner) {
      if (await User.findOne({ discordId: message.author.id })) {
        return message.channel.send("You've already seeded the database!");
      }
      for (let member of currentMems) {
        if (member.user.bot) {
          continue;
        }
        const newUser = {
          name: member.user.username,
          discordId: member.user.id
        };
        User.create(newUser);
      }
      message.channel.send('Database seeded!');
    }
    else {
      message.channel.send('Only the bot owner may run this command!');
    }
  }
};
