const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user.js');
const perms = require('../../middleware/perms.js');

module.exports = {
  name: 'dbdrop',
  description: 'Drops a database',
  guildOnly: true,
  async execute(message, args) {
    const isBotOwner = await perms.isBotOwner(message);
    if (isBotOwner) {
      message.channel
        .send(`Are you sure you want to drop the database?`)
        .then(() => {
          const filter = (m) => m.author.id === message.author.id;
          message.channel
            .awaitMessages(filter, {
              max: 1,
              time: 5000,
              errors: [ 'time' ]
            })
            .then(async (collected) => {
              if (collected.first().content.toLowerCase() === 'yes') {
                User.deleteMany({});
                message.channel.send(`Database dropped.`);
              }
              else if (collected.first().content.toLowerCase() === 'no') {
                message.channel.send(`Okay.`);
              }
            })
            .catch((collected) => {
              message.channel.send('Need some more time to think about it?');
            });
        });
    }
    else {
      message.channel.send(
        'You must be an admin of the server to use this command!'
      );
    }
  }
};
