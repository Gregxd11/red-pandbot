const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'reddit',
	description: 'Search for the top post (excluding a stickied/pinned) or a random post in the top 25 of a subreddit  ',
	usage: '<subreddit> optional: <rand> ',
	args: true,
	cooldown: 3,
	async execute(message, args) {
		if (args[1] && args[1].toLowerCase() !== 'rand') {
			return message.reply("That's not a valid subreddit name/command!");
		}
		const subreddit = args[0];
		const subData = await (await fetch(`https://reddit.com/r/${subreddit}.json`)).json();
		let post = subData.data.children[0].data;
		let title;
		let thumbnail;

		//==========FUNCTIONS====================//
		function randNum() {
			return Math.floor(Math.random() * 25);
		}

		function randomPost(num) {
			let post = subData.data.children[num].data;
			if (num < 2 && (post.stickied || post.pinned)) {
				return randomPost(randNum());
			}
			else {
				return post;
			}
		}
		//======================================//

		//======HANDLES RAND ARGUMENT==========//
		if (args[1] && args[1].toLowerCase() === 'rand') {
			post = randomPost(randNum());
		}
		else {
			for (let i = 0; i <= 2; i++) {
				if (post.stickied || post.pinned) {
					post = subData.data.children[i].data;
				}
			}
		}
		// ==================================== //

		//MAKES SURE TITLE ISN'T OVER 256 CHARS //
		if (post.title[257]) {
			title = post.title.slice(0, 256);
		}
		else {
			title = post.title;
		}
		// =================================== //

		if (post.thumbnail === 'self') {
			thumbnail = undefined;
		}
		else {
			thumbnail = post.thumbnail;
		}

		const embed = new Discord.MessageEmbed()
			.setColor('#e69500')
			.setTitle(title)
			.setImage(thumbnail)
			.setAuthor(post.author)
			.setURL(post.url)
			.addFields(
				{ name: 'Subreddit', value: post.subreddit_name_prefixed, inline: true },
				{ name: 'Upvotes', value: post.score, inline: true },
				{ name: 'Link to post', value: 'https://reddit.com' + post.permalink }
			)
			.setFooter('Amount of subscribers: ' + post.subreddit_subscribers);
		message.channel.send(embed);
	}
};
