const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'tarot',
	description: 'Grabs a random tarot cards.',
	args: false,
	// usage:
	async execute(message, args) {
		const file = await (await fetch('https://rws-cards-api.herokuapp.com/api/v1/cards/random')).json();
		const card = file.cards[0];
		const embed = new Discord.MessageEmbed()
			.setColor('#e69500')
			.setTitle(card.name)
			.setDescription(card.desc)
			.addFields(
				{
					name: 'Suit',
					value: card.suit
				},
				{
					name: 'Type',
					value: card.type
				},
				{ name: 'Meaning', value: card.meaning_up },
				{ name: 'Meaning reversed', value: card.meaning_rev }
			);
		message.channel.send(embed);
	}
};
