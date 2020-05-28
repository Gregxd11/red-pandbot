module.exports = {
  name: 'sadcat',
	description: 'When a moment is fit better with a sadcat',
	execute(message, args) {
    message.channel.send('Now that\'s a sadcat moment.');
    const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'sadcat');
    message.channel.send(`${emoji}`);
	},
}
