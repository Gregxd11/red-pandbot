module.exports = {
	name: 'doit',
	description: 'See what happens',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Touch your face...just do it. See what happens.');
	}
};
