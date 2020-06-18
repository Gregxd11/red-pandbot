const User = require('../../models/user.js');
const perms = require('../../middleware/perms.js');
module.exports = {
  name: 'balance',
  description: 'Shows balance of bank',
  async execute(message, args) {
    const isBotAdmin = await perms.isBotAdmin(message);
    const authorId = message.author.id;
    const [ userDbInfo ] = await User.find({ discordId: authorId });
    const bank = {
      currency: 'pawpads'
    };
    message.channel.send(`You have ${userDbInfo.balance} ${bank.currency}.`);
  }
};
