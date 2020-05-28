module.exports = {
	name: 'gay',
	description: 'tells the person they are gay',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(`${message.author.username} is gay.`);
		const emoji = message.guild.emojis.cache.find((emoji) => emoji.name === 'wahgers');
		message.channel.send(`${emoji}`);
	}
};
