const User = require('../models/user.js');

const perms = {
  async isServerAdmin(message) {
    const author = message.author.id;
    return await message.guild.members
      .fetch(author)
      .then((res) => res.hasPermission('ADMINISTRATOR'));
  },
  async isBotOwner(message) {
    const botOwnerId = '166282943126306816';
    return botOwnerId === message.author.id;
  },
  async isBotAdmin(message) {
    const author = message.author.id;
    const [ botPerms ] = await User.find({ discordId: author });
    return botPerms.rpRole === 'ADMIN' || this.isBotOwner(message);
  },
  async isBotMod(message) {
    const author = message.author.id;
    const [ botPerms ] = await User.find({ discordId: author });
    return (
      botPerms.rpRole === 'MOD' ||
      botPerms.rpRole === 'ADMIN' ||
      this.isBotOwner(message)
    );
  }
};

module.exports = perms;
