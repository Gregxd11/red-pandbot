module.exports = {
	name: 'args-info',
	description: 'test for args',
	args: true,
	usage: '<test> <uwu>',
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	}
};
