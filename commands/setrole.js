const perms = require('../middleware/perms.js');
const User = require('../models/user.js');

module.exports = {
  name: 'setrole',
  description:
    'Sets a role for permission levels for a user interacting with the bot',
  args: true,
  usage: '<@user>',
  async execute(message, args) {
    const isAdmin = await perms.isAdmin(message);
    const taggedUser = message.mentions.users.first();
    if (isAdmin) {
      message.channel
        .send(
          `Would you like ${taggedUser.username} to recieve admin or mod permissions to use me?`
        )
        .then(() => {
          const filter = (m) => m.author.id === message.author.id;
          message.channel
            .awaitMessages(filter, {
              max: 1,
              time: 5000,
              errors: [ 'time' ]
            })
            .then(async (collected) => {
              if (collected.first().content.toLowerCase() === 'mod') {
                await User.updateOne(
                  { discordId: taggedUser.id },
                  { rpRole: 'MOD' }
                );
                message.channel.send(`Mod permission added for ${taggedUser}`);
              }
              else if (collected.first().content.toLowerCase() === 'admin') {
                await User.updateOne(
                  { discordId: taggedUser.id },
                  { rpRole: 'ADMIN' }
                );
                message.channel.send(
                  `Admin permission added for ${taggedUser}`
                );
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
