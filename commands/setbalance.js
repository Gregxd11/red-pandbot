const User = require('../models/user.js');
const perms = require('../middleware/perms.js');
module.exports = {
  name: 'setbalance',
  description: 'Shows balance of bank',
  args: true,
  usage: '<@user> <amount>',
  async execute(message, args) {
    const isBotAdmin = await perms.isBotAdmin(message);
    const taggedUser = message.mentions.users.first();
    const [ , balance ] = args;

    if (!balance) {
      return message.channel.send('Please give an amount to set.');
    }
    if (isBotAdmin) {
      const updatedInfo = await User.findOneAndUpdate(
        { discordId: taggedUser.id },
        { balance },
        { new: true }
      );
      return message.channel.send(
        `${taggedUser.username}'s bank set to ${updatedInfo.balance}.`
      );
    }
  }
};
