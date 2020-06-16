const perms = {
  async isAdmin(message) {
    const author = message.author.id;
    return await message.guild.members
      .fetch(author)
      .then((res) => res.hasPermission('ADMINISTRATOR'));
  },
  async isBotOwner(message) {
    const botOwnerId = '166282943126306816';
    return botOwnerId === message.author.id;
  }
};

module.exports = perms;
